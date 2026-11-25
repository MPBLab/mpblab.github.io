/*
 * Waterfall plot of the exact two-soliton solution of the
 * Korteweg–de Vries equation  u_t + 6 u u_x + u_xxx = 0.
 *
 *   u(x,t) = 2 ∂²/∂x² ln τ,
 *   τ = 1 + e^{η1} + e^{η2} + A e^{η1+η2},
 *   ηi = ki x − ki³ t,   A = ((k1 − k2)/(k1 + k2))².
 *
 * Each soliton has height ki²/2 and speed ki².
 */
(function () {
  "use strict";

  var canvas = document.getElementById("soliton");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");

  var k1 = 1.3, k2 = 0.8;
  var lnA = 2 * Math.log((k1 - k2) / (k1 + k2));
  var X = 26;          // x runs from -X to X
  var T = 13;          // t runs from -T to T
  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function lnTau(x, t) {
    var e1 = k1 * x - k1 * k1 * k1 * t;
    var e2 = k2 * x - k2 * k2 * k2 * t;
    var terms = [0, e1, e2, lnA + e1 + e2];
    var m = Math.max.apply(null, terms);
    var s = 0;
    for (var i = 0; i < 4; i++) s += Math.exp(terms[i] - m);
    return m + Math.log(s);
  }

  function u(x, t) {
    var h = 0.02;
    return 2 * (lnTau(x + h, t) - 2 * lnTau(x, t) + lnTau(x - h, t)) / (h * h);
  }

  function cssVar(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }

  function hexToRgb(hex) {
    var m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex);
    return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [48, 70, 168];
  }

  var slices = [];   // precomputed curves, front (earliest) first
  var size = { w: 0, h: 0 };

  function compute() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = canvas.clientWidth, h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    size = { w: w, h: h };

    var n = w < 600 ? 22 : 34;              // number of time slices
    var pts = Math.max(160, Math.round(w / 3));
    var depth = h * 0.52;                   // vertical room used by the stack
    var amp = h * 0.42;                     // pixels per unit of u
    var skew = w * 0.12;                    // sideways shift of the back slices
    var base = h - 6;

    slices = [];
    for (var j = 0; j < n; j++) {
      var f = j / (n - 1);                  // 0 = front (earliest), 1 = back (latest)
      var t = -T + 2 * T * f;
      var y0 = base - depth * f;
      var dx = skew * f;
      var curve = [];
      for (var i = 0; i <= pts; i++) {
        var x = -X + (2 * X * i) / pts;
        var px = (i / pts) * (w - skew) + dx;
        curve.push([px, y0 - amp * u(x, t)]);
      }
      slices.push({ f: f, y0: y0, curve: curve });
    }
  }

  function draw(count) {
    var paper = cssVar("--paper", "#f5f7f6");
    var c1 = hexToRgb(cssVar("--physics", "#3046a8"));
    var c2 = hexToRgb(cssVar("--biology", "#1d7558"));
    ctx.clearRect(0, 0, size.w, size.h);

    // Draw from back to front so nearer slices hide the ones behind them.
    var shown = Math.min(count, slices.length);
    for (var j = shown - 1; j >= 0; j--) {
      var s = slices[j];
      var c = [0, 1, 2].map(function (k) { return Math.round(c1[k] + (c2[k] - c1[k]) * s.f); });

      ctx.beginPath();
      ctx.moveTo(s.curve[0][0], s.curve[0][1]);
      for (var i = 1; i < s.curve.length; i++) ctx.lineTo(s.curve[i][0], s.curve[i][1]);
      ctx.lineTo(s.curve[s.curve.length - 1][0], size.h);
      ctx.lineTo(s.curve[0][0], size.h);
      ctx.closePath();
      ctx.fillStyle = paper;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(s.curve[0][0], s.curve[0][1]);
      for (var k = 1; k < s.curve.length; k++) ctx.lineTo(s.curve[k][0], s.curve[k][1]);
      ctx.strokeStyle = "rgba(" + c.join(",") + "," + (0.95 - 0.45 * s.f) + ")";
      ctx.lineWidth = j === 0 ? 2 : 1.25;
      ctx.stroke();
    }
  }

  function animateIn() {
    var start = null, duration = 1800;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / duration);
      var eased = 1 - Math.pow(1 - p, 3);
      draw(Math.ceil(eased * slices.length));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  compute();
  if (reduceMotion) draw(slices.length); else animateIn();

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { compute(); draw(slices.length); }, 150);
  });

  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var redraw = function () { draw(slices.length); };
    if (mq.addEventListener) mq.addEventListener("change", redraw);
  }
})();
