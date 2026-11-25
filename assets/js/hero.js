/*
 * Home page hero animations.
 *
 * Physics panel: exact two-soliton solution of the Korteweg–de Vries equation
 *   u_t + 6 u u_x + u_xxx = 0,   u = 2 ∂²/∂x² ln τ,
 *   τ = 1 + e^{η1} + e^{η2} + A e^{η1+η2},  ηi = ki x − ki³ t,
 *   A = ((k1 − k2)/(k1 + k2))².
 * drawn as a waterfall: each line is the wave at an earlier moment.
 *
 * Biology panel: Lotka–Volterra predator–prey model
 *   dx/dt = x − x y,   dy/dt = x y − y,
 * whose orbits are closed curves around the equilibrium (1, 1).
 */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setup(canvas) {
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = canvas.clientWidth, h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx: ctx, w: w, h: h };
  }

  /* ---------------- Physics: KdV solitons ---------------- */

  function Solitons(canvas) {
    var k1 = 1.3, k2 = 0.8;
    var lnA = 2 * Math.log((k1 - k2) / (k1 + k2));
    var X = 24, T = 12;
    var bg = "#182565";
    var n, dtSlice, pts, g;
    var t = -T;

    function lnTau(x, tt) {
      var e1 = k1 * x - k1 * k1 * k1 * tt;
      var e2 = k2 * x - k2 * k2 * k2 * tt;
      var e3 = lnA + e1 + e2;
      var m = Math.max(0, e1, e2, e3);
      return m + Math.log(Math.exp(-m) + Math.exp(e1 - m) + Math.exp(e2 - m) + Math.exp(e3 - m));
    }
    function u(x, tt) {
      var hh = 0.02;
      return 2 * (lnTau(x + hh, tt) - 2 * lnTau(x, tt) + lnTau(x - hh, tt)) / (hh * hh);
    }

    function resize() {
      g = setup(canvas);
      n = g.w < 500 ? 18 : 26;
      dtSlice = 0.75;
      pts = Math.max(120, Math.min(260, Math.round(g.w / 3)));
    }

    function draw() {
      var ctx = g.ctx, w = g.w, h = g.h;
      ctx.clearRect(0, 0, w, h);
      var top = h * 0.1, front = h * 0.6;
      var depth = front - top - h * 0.14;
      var amp = h * 0.24;
      var skew = w * 0.16;
      var padL = w * 0.04, span = w * 0.92 - skew;

      for (var j = n - 1; j >= 0; j--) {
        var f = j / (n - 1);                 // 0 = front (newest), 1 = back (oldest)
        var tt = t - j * dtSlice;
        var fade = Math.max(0, Math.min(1, (T - Math.abs(tt)) / 3));
        if (fade <= 0) continue;
        var y0 = front - depth * f;
        var dx = padL + skew * f;

        ctx.beginPath();
        for (var i = 0; i <= pts; i++) {
          var x = -X + (2 * X * i) / pts;
          var px = dx + (i / pts) * span;
          var py = y0 - amp * u(x, tt);
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.lineTo(dx + span, y0 + 2);
        ctx.lineTo(dx, y0 + 2);
        ctx.closePath();
        ctx.fillStyle = bg;
        ctx.fill();

        ctx.beginPath();
        for (var k = 0; k <= pts; k++) {
          var x2 = -X + (2 * X * k) / pts;
          var px2 = dx + (k / pts) * span;
          var py2 = y0 - amp * u(x2, tt);
          if (k === 0) ctx.moveTo(px2, py2); else ctx.lineTo(px2, py2);
        }
        var a = fade * (j === 0 ? 1 : 0.8 - 0.55 * f);
        ctx.strokeStyle = j === 0 ? "rgba(255,255,255," + a + ")" : "rgba(174,187,255," + a + ")";
        ctx.lineWidth = j === 0 ? 2 : 1.1;
        ctx.stroke();
      }
    }

    function step(dt) {
      t += dt * 2.4;
      if (t - (n - 1) * dtSlice > T) t = -T;
    }

    resize();
    if (reduceMotion) t = (n - 1) * dtSlice / 2;
    return { resize: resize, draw: draw, step: step };
  }

  /* ---------------- Biology: Lotka–Volterra orbits ---------------- */

  function Orbits(canvas) {
    var starts = [0.62, 0.45, 0.32, 0.22, 0.14];
    var orbits = [], xmax = 0, ymax = 0, g, clock = 0;

    function f(x, y) { return [x - x * y, x * y - y]; }

    starts.forEach(function (y0) {
      var x = 1, y = y0, h = 0.01, path = [[x, y]];
      for (var s = 0; s < 4000; s++) {
        var a = f(x, y);
        var b = f(x + h / 2 * a[0], y + h / 2 * a[1]);
        var c = f(x + h / 2 * b[0], y + h / 2 * b[1]);
        var d = f(x + h * c[0], y + h * c[1]);
        var nx = x + h / 6 * (a[0] + 2 * b[0] + 2 * c[0] + d[0]);
        var ny = y + h / 6 * (a[1] + 2 * b[1] + 2 * c[1] + d[1]);
        // Stop after one full loop: back to x = 1 below the equilibrium.
        if (s > 50 && x < 1 && nx >= 1 && ny < 1) break;
        x = nx; y = ny; path.push([x, y]);
        xmax = Math.max(xmax, x); ymax = Math.max(ymax, y);
      }
      orbits.push(path);
    });

    function resize() { g = setup(canvas); }

    function draw() {
      var ctx = g.ctx, w = g.w, h = g.h;
      ctx.clearRect(0, 0, w, h);
      var left = w * 0.1, right = w * 0.94, top = h * 0.1, bottom = h * 0.6;
      function X(x) { return left + (x / (xmax * 1.05)) * (right - left); }
      function Y(y) { return bottom - (y / (ymax * 1.08)) * (bottom - top); }

      // Axes
      ctx.strokeStyle = "rgba(146,230,196,0.35)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(left, top); ctx.lineTo(left, bottom); ctx.lineTo(right, bottom);
      ctx.stroke();
      ctx.fillStyle = "rgba(146,230,196,0.7)";
      ctx.font = "italic 14px Newsreader, Georgia, serif";
      ctx.fillText("prey", right - 28, bottom + 18);
      ctx.save();
      ctx.translate(left - 10, top + 52);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText("predators", 0, 0);
      ctx.restore();

      orbits.forEach(function (path, idx) {
        ctx.beginPath();
        path.forEach(function (p, i) {
          if (i === 0) ctx.moveTo(X(p[0]), Y(p[1])); else ctx.lineTo(X(p[0]), Y(p[1]));
        });
        ctx.closePath();
        ctx.strokeStyle = "rgba(146,230,196," + (0.22 + 0.1 * idx) + ")";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Moving point with a fading trail. Points are equally spaced in time,
        // so the tracer slows down and speeds up as the real populations do.
        var len = path.length;
        var head = Math.floor((clock * 100 + idx * len * 0.37) % len);
        var trail = Math.min(70, len - 1);
        for (var k = trail; k > 0; k--) {
          var p0 = path[(head - k + len) % len], p1 = path[(head - k + 1 + len) % len];
          ctx.beginPath();
          ctx.moveTo(X(p0[0]), Y(p0[1]));
          ctx.lineTo(X(p1[0]), Y(p1[1]));
          ctx.strokeStyle = "rgba(255,255,255," + (0.9 * (1 - k / trail)) + ")";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        var ph = path[head];
        ctx.beginPath();
        ctx.arc(X(ph[0]), Y(ph[1]), 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      });

      // Equilibrium point
      ctx.beginPath();
      ctx.arc(X(1), Y(1), 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(146,230,196,0.9)";
      ctx.fill();
    }

    function step(dt) { clock += dt * 0.9; }

    resize();
    return { resize: resize, draw: draw, step: step };
  }

  /* ---------------- Run ---------------- */

  var scenes = [];
  var pc = document.getElementById("physics-canvas");
  var bc = document.getElementById("biology-canvas");
  if (pc && pc.getContext) scenes.push(Solitons(pc));
  if (bc && bc.getContext) scenes.push(Orbits(bc));
  if (!scenes.length) return;

  function drawAll() { scenes.forEach(function (s) { s.draw(); }); }

  var running = false, visible = true, last = null;
  function frame(ts) {
    if (!running) return;
    var dt = last === null ? 0 : Math.min(0.05, (ts - last) / 1000);
    last = ts;
    scenes.forEach(function (s) { s.step(dt); s.draw(); });
    requestAnimationFrame(frame);
  }
  function start() {
    if (running || reduceMotion || !visible || document.hidden) return;
    running = true; last = null; requestAnimationFrame(frame);
  }
  function stop() { running = false; }

  drawAll();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawAll);
  start();

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) start(); else stop();
    }).observe(pc || bc);
  }
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop(); else start();
  });

  var timer;
  window.addEventListener("resize", function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      scenes.forEach(function (s) { s.resize(); });
      drawAll();
    }, 150);
  });
})();
