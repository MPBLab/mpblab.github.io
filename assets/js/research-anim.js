/*
 * Field animations for the Research page. Each <canvas data-anim="..."> gets
 * a small live simulation of its field's mathematics:
 *
 *   plasma-waves              two KdV solitons colliding (exact 2-soliton solution)
 *   evolution-equations       a sine wave steepening into a shock (viscous Burgers, finite differences)
 *   mathematical-biology      an SIR epidemic spreading through moving individuals
 *   relativistic-astrophysics test particles on precessing orbits around a compact star
 *   control-systems           trajectories driven to a stable equilibrium (damped system, Lyapunov level sets)
 *   fluid-dynamics            tracer particles in potential flow past a cylinder
 *
 * Animations run only while visible and stop for visitors who prefer reduced motion.
 */
(function () {
  "use strict";

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var BG = "#0f1e3d";

  function rgba(hex, a) {
    var n = parseInt(hex.slice(1), 16);
    return "rgba(" + (n >> 16 & 255) + "," + (n >> 8 & 255) + "," + (n & 255) + "," + a + ")";
  }

  /* ---------- 1. KdV two-soliton collision ---------- */
  function plasma() {
    var k1 = 1.25, k2 = 0.8, lnA = 2 * Math.log((k1 - k2) / (k1 + k2)), T = 11, t = -T;
    function lnTau(x, tt) {
      var e1 = k1 * x - k1 * k1 * k1 * tt, e2 = k2 * x - k2 * k2 * k2 * tt, e3 = lnA + e1 + e2;
      var m = Math.max(0, e1, e2, e3);
      return m + Math.log(Math.exp(-m) + Math.exp(e1 - m) + Math.exp(e2 - m) + Math.exp(e3 - m));
    }
    function u(x, tt) { var h = 0.03; return 2 * (lnTau(x + h, tt) - 2 * lnTau(x, tt) + lnTau(x - h, tt)) / (h * h); }
    return {
      step: function (dt) { t += dt * 2.2; if (t > T) t = -T; },
      draw: function (c, w, h) {
        var X = 22, n = 220, base = h * 0.86, amp = h * 0.62;
        // faint history lines (earlier times), like a waterfall plot
        for (var j = 6; j >= 0; j--) {
          var tt = t - j * 0.9, off = j * h * 0.035;
          c.beginPath();
          for (var i = 0; i <= n; i++) {
            var x = -X + 2 * X * i / n, px = w * i / n, py = base - off - amp * u(x, tt);
            if (i) c.lineTo(px, py); else c.moveTo(px, py);
          }
          c.strokeStyle = j === 0 ? "#ffffff" : rgba("#a9c1ff", 0.32 - j * 0.04);
          c.lineWidth = j === 0 ? 2.2 : 1.2;
          c.stroke();
          if (j === 0) {
            c.lineTo(w, h); c.lineTo(0, h); c.closePath();
            var g = c.createLinearGradient(0, base - amp, 0, h);
            g.addColorStop(0, rgba("#6f8fff", 0.35)); g.addColorStop(1, rgba("#6f8fff", 0));
            c.fillStyle = g; c.fill();
          }
        }
      }
    };
  }

  /* ---------- 2. Burgers: sine wave steepening into a shock ---------- */
  function evolution() {
    var N = 240, L = 2 * Math.PI, dx = L / N, nu = 0.012, u = new Float64Array(N), un = new Float64Array(N), time = 0;
    function reset() { for (var i = 0; i < N; i++) u[i] = 0.35 + Math.sin(i * dx); time = 0; }
    reset();
    function sub(dt) {
      for (var i = 0; i < N; i++) {
        var im = (i - 1 + N) % N, ip = (i + 1) % N;
        // Godunov-type upwind flux for u^2/2 plus central diffusion
        var fR = flux(u[i], u[ip]), fL = flux(u[im], u[i]);
        un[i] = u[i] - dt / dx * (fR - fL) + nu * dt / (dx * dx) * (u[ip] - 2 * u[i] + u[im]);
      }
      var tmp = u; u = un; un = tmp;
    }
    function flux(a, b) {
      var fa = a * a / 2, fb = b * b / 2;
      if (a <= b) { if (a > 0) return fa; if (b < 0) return fb; return 0; }
      return Math.max(fa, fb);
    }
    return {
      step: function (dt) {
        var steps = Math.max(1, Math.round(dt / 0.004));
        for (var s = 0; s < steps; s++) sub(0.004);
        time += dt; if (time > 7) reset();
      },
      draw: function (c, w, h) {
        var mid = h * 0.56, amp = h * 0.32;
        c.strokeStyle = rgba("#a9c1ff", 0.18); c.lineWidth = 1;
        c.beginPath(); c.moveTo(0, mid); c.lineTo(w, mid); c.stroke();
        // initial profile for comparison
        c.beginPath();
        for (var i = 0; i <= N; i++) { var px = w * i / N, py = mid - amp * (0.35 + Math.sin(i * dx) - 0.35); if (i) c.lineTo(px, py); else c.moveTo(px, py); }
        c.setLineDash([4, 5]); c.strokeStyle = rgba("#a9c1ff", 0.35); c.stroke(); c.setLineDash([]);
        c.beginPath();
        for (var k = 0; k <= N; k++) { var px2 = w * k / N, py2 = mid - amp * (u[k % N] - 0.35); if (k) c.lineTo(px2, py2); else c.moveTo(px2, py2); }
        c.strokeStyle = "#ffffff"; c.lineWidth = 2.4; c.stroke();
        c.fillStyle = rgba("#a9c1ff", 0.75); c.font = "italic 13px 'TeX Gyre Pagella', serif";
        c.fillText("t = " + time.toFixed(1), 12, h - 12);
      }
    };
  }

  /* ---------- 3. SIR epidemic among moving individuals ---------- */
  function biology() {
    var P = [], n = 120, w0 = 1, h0 = 1, clock = 0;
    function reset() {
      P = [];
      for (var i = 0; i < n; i++) {
        var a = Math.random() * 6.283;
        P.push({ x: Math.random(), y: Math.random(), vx: Math.cos(a) * 0.06, vy: Math.sin(a) * 0.06, s: i < 2 ? 1 : 0, t: 0 });
      }
      clock = 0;
    }
    reset();
    return {
      step: function (dt) {
        clock += dt;
        var r = 0.035, infected = 0;
        for (var i = 0; i < n; i++) {
          var p = P[i];
          p.x += p.vx * dt; p.y += p.vy * dt * w0 / h0;
          if (p.x < 0 || p.x > 1) { p.vx *= -1; p.x = Math.min(1, Math.max(0, p.x)); }
          if (p.y < 0 || p.y > 1) { p.vy *= -1; p.y = Math.min(1, Math.max(0, p.y)); }
          if (p.s === 1) { p.t += dt; infected++; if (p.t > 4.5) p.s = 2; }
        }
        for (var a = 0; a < n; a++) if (P[a].s === 1) for (var b = 0; b < n; b++) if (P[b].s === 0) {
          var dxx = P[a].x - P[b].x, dyy = (P[a].y - P[b].y) * h0 / w0;
          if (dxx * dxx + dyy * dyy < r * r && Math.random() < dt * 4) { P[b].s = 1; P[b].t = 0; }
        }
        if ((infected === 0 && clock > 3) || clock > 30) reset();
      },
      draw: function (c, w, h) {
        w0 = w; h0 = h;
        var col = ["rgba(220,228,245,0.75)", "#7fd4b1", "rgba(130,150,200,0.45)"], S = 0, I = 0, R = 0;
        for (var i = 0; i < n; i++) {
          var p = P[i];
          if (p.s === 1) { c.beginPath(); c.arc(p.x * w, p.y * h, 9, 0, 6.283); c.fillStyle = rgba("#7fd4b1", 0.15); c.fill(); }
          c.beginPath(); c.arc(p.x * w, p.y * h, 3.2, 0, 6.283); c.fillStyle = col[p.s]; c.fill();
          if (p.s === 0) S++; else if (p.s === 1) I++; else R++;
        }
        c.font = "13px 'TeX Gyre Pagella', serif";
        var labels = [["S", S, col[0]], ["I", I, "#7fd4b1"], ["R", R, "rgba(160,178,225,0.9)"]];
        for (var k = 0; k < 3; k++) { c.fillStyle = labels[k][2]; c.fillText(labels[k][0] + " " + labels[k][1], 12 + k * 58, h - 12); }
      }
    };
  }

  /* ---------- 4. Orbits around a compact star (relativistic precession) ---------- */
  function astro() {
    var bodies = [
      { p: 0.42, e: 0.55, d: 0.16, phi: 0, sp: 1.0, tr: [] },
      { p: 0.62, e: 0.35, d: 0.08, phi: 2, sp: 0.6, tr: [] },
      { p: 0.3, e: 0.2, d: 0.25, phi: 4, sp: 1.6, tr: [] }
    ];
    return {
      step: function (dt) {
        bodies.forEach(function (b) {
          var r = b.p / (1 + b.e * Math.cos((1 - b.d) * b.phi));
          b.phi += dt * b.sp * 0.9 / (r * r) * 0.12;
          b.tr.push(b.phi); if (b.tr.length > 260) b.tr.shift();
        });
      },
      draw: function (c, w, h) {
        var cx = w / 2, cy = h / 2, S = Math.min(w, h) * 0.62;
        // curved-space grid: rings drawn closer together near the star
        for (var k = 1; k <= 9; k++) {
          var rr = S * (0.08 + 0.1 * k - 0.05 / k);
          c.beginPath(); c.ellipse(cx, cy, rr, rr * 0.55, 0, 0, 6.283);
          c.strokeStyle = rgba("#a9c1ff", 0.09 + 0.02 * (9 - k) / 9); c.lineWidth = 1; c.stroke();
        }
        var g = c.createRadialGradient(cx, cy, 0, cx, cy, S * 0.16);
        g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(0.35, "rgba(190,210,255,0.9)"); g.addColorStop(1, "rgba(90,120,255,0)");
        c.fillStyle = g; c.beginPath(); c.arc(cx, cy, S * 0.16, 0, 6.283); c.fill();
        bodies.forEach(function (b) {
          function pos(phi) { var r = b.p / (1 + b.e * Math.cos((1 - b.d) * phi)); return [cx + S * r * Math.cos(phi), cy + S * 0.55 * r * Math.sin(phi)]; }
          for (var i = 1; i < b.tr.length; i++) {
            var a1 = pos(b.tr[i - 1]), a2 = pos(b.tr[i]);
            c.beginPath(); c.moveTo(a1[0], a1[1]); c.lineTo(a2[0], a2[1]);
            c.strokeStyle = rgba("#a9c1ff", 0.7 * i / b.tr.length); c.lineWidth = 1.6; c.stroke();
          }
          var q = pos(b.phi); c.beginPath(); c.arc(q[0], q[1], 3.4, 0, 6.283); c.fillStyle = "#ffffff"; c.fill();
        });
      }
    };
  }

  /* ---------- 5. Trajectories driven to a stable equilibrium ---------- */
  function control() {
    var Tr = [], zeta = 0.14;
    function spawn() {
      var a = Math.random() * 6.283, r = 0.8 + Math.random() * 0.2;
      return { x: r * Math.cos(a) * 1.6, y: r * Math.sin(a), pts: [], age: 0 };
    }
    for (var i = 0; i < 7; i++) { var s = spawn(); var pre = Math.random() * 9; for (var q = 0; q < pre * 30; q++) { var hh = 0.03 * 0.9, ddx = s.y, ddy = -s.x - 2 * zeta * s.y; s.x += hh * ddx; s.y += hh * ddy; } Tr.push(s); }
    return {
      step: function (dt) {
        Tr.forEach(function (p, i) {
          for (var k = 0; k < 4; k++) {
            var h = dt / 4 * 0.9, dx = p.y, dy = -p.x - 2 * zeta * p.y;
            p.x += h * dx; p.y += h * dy;
          }
          p.pts.push([p.x, p.y]); if (p.pts.length > 220) p.pts.shift();
          p.age += dt;
          if (p.x * p.x + p.y * p.y < 0.006 || p.age > 16) Tr[i] = spawn();
        });
      },
      draw: function (c, w, h) {
        var cx = w / 2, cy = h / 2, S = Math.min(w / 3.6, h / 2.4);
        for (var k = 1; k <= 5; k++) {
          c.beginPath(); c.ellipse(cx, cy, S * 0.33 * k, S * 0.24 * k, -0.35, 0, 6.283);
          c.strokeStyle = rgba("#67e8f9", 0.07 + 0.02 * (5 - k)); c.lineWidth = 1; c.stroke();
        }
        c.strokeStyle = rgba("#a9c1ff", 0.16);
        c.beginPath(); c.moveTo(0, cy); c.lineTo(w, cy); c.moveTo(cx, 0); c.lineTo(cx, h); c.stroke();
        Tr.forEach(function (p) {
          for (var i = 1; i < p.pts.length; i++) {
            c.beginPath(); c.moveTo(cx + S * p.pts[i - 1][0], cy - S * p.pts[i - 1][1]); c.lineTo(cx + S * p.pts[i][0], cy - S * p.pts[i][1]);
            c.strokeStyle = rgba("#67e8f9", 0.8 * i / p.pts.length); c.lineWidth = 1.7; c.stroke();
          }
          c.beginPath(); c.arc(cx + S * p.x, cy - S * p.y, 3, 0, 6.283); c.fillStyle = "#ffffff"; c.fill();
        });
        c.beginPath(); c.arc(cx, cy, 4.5, 0, 6.283); c.fillStyle = "#67e8f9"; c.fill();
      }
    };
  }

  /* ---------- 6. Potential flow past a cylinder ---------- */
  function fluid() {
    var P = [], n = 150, a = 0.22;
    function vel(x, y) {
      var r2 = x * x + y * y, ux, uy;
      if (r2 < a * a) return [0, 0];
      var c2 = (x * x - y * y) / (r2 * r2), s2 = 2 * x * y / (r2 * r2);
      ux = 1 - a * a * c2; uy = -a * a * s2;
      return [ux, uy];
    }
    function spawn(anyX) {
      var y = (Math.random() - 0.5) * 1.1;
      return { x: anyX ? -1.4 + Math.random() * 2.8 : -1.4 - Math.random() * 0.3, y: y, pts: [] };
    }
    for (var i = 0; i < n; i++) P.push(spawn(true));
    return {
      step: function (dt) {
        P.forEach(function (p, i) {
          var v = vel(p.x, p.y);
          p.x += v[0] * dt * 0.42; p.y += v[1] * dt * 0.42;
          p.pts.push([p.x, p.y]); if (p.pts.length > 34) p.pts.shift();
          if (p.x > 1.45 || p.x * p.x + p.y * p.y < a * a * 0.98) P[i] = spawn(false);
        });
      },
      draw: function (c, w, h) {
        var S = w / 2.8, cx = w / 2, cy = h / 2;
        P.forEach(function (p) {
          if (p.pts.length < 2) return;
          var v = vel(p.x, p.y), sp = Math.min(1, Math.hypot(v[0], v[1]) / 2);
          c.beginPath();
          c.moveTo(cx + S * p.pts[0][0], cy + S * p.pts[0][1]);
          for (var i = 1; i < p.pts.length; i++) c.lineTo(cx + S * p.pts[i][0], cy + S * p.pts[i][1]);
          c.strokeStyle = rgba(sp > 0.62 ? "#ffffff" : "#a9c1ff", 0.35 + 0.5 * sp); c.lineWidth = 1.4; c.stroke();
        });
        c.beginPath(); c.arc(cx, cy, S * a, 0, 6.283);
        c.fillStyle = "#1d3463"; c.fill(); c.strokeStyle = rgba("#a9c1ff", 0.8); c.lineWidth = 1.5; c.stroke();
      }
    };
  }

  var MAKERS = {
    "plasma-waves": plasma, "evolution-equations": evolution, "mathematical-biology": biology,
    "relativistic-astrophysics": astro, "control-systems": control, "fluid-dynamics": fluid
  };

  var scenes = [];
  document.querySelectorAll("canvas[data-anim]").forEach(function (cv) {
    var make = MAKERS[cv.getAttribute("data-anim")];
    if (!make || !cv.getContext) return;
    scenes.push({ cv: cv, ctx: cv.getContext("2d"), sim: make(), visible: false, w: 0, h: 0 });
  });
  if (!scenes.length) return;

  function size(s) {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    s.w = s.cv.clientWidth; s.h = s.cv.clientHeight;
    s.cv.width = Math.round(s.w * dpr); s.cv.height = Math.round(s.h * dpr);
    s.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function paint(s) {
    s.ctx.fillStyle = BG; s.ctx.fillRect(0, 0, s.w, s.h);
    s.sim.draw(s.ctx, s.w, s.h);
  }
  scenes.forEach(function (s) {
    size(s);
    if (reduce) for (var i = 0; i < 120; i++) s.sim.step(1 / 30);   // show a representative still frame
    paint(s);
  });

  if (!reduce) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { scenes.forEach(function (s) { if (s.cv === e.target) s.visible = e.isIntersecting; }); });
      }, { rootMargin: "100px" });
      scenes.forEach(function (s) { io.observe(s.cv); });
    } else { scenes.forEach(function (s) { s.visible = true; }); }
    var last = null;
    (function frame(ts) {
      var dt = last === null ? 0 : Math.min(0.05, (ts - last) / 1000); last = ts;
      if (!document.hidden) scenes.forEach(function (s) { if (s.visible) { s.sim.step(dt); paint(s); } });
      requestAnimationFrame(frame);
    })(performance.now());
  }

  var timer;
  window.addEventListener("resize", function () {
    clearTimeout(timer);
    timer = setTimeout(function () { scenes.forEach(function (s) { size(s); paint(s); }); }, 150);
  });
})();
