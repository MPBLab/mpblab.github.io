/*
 * Mathematics on the MPB Lab website.
 *
 * Any page that contains LaTeX is typeset automatically with KaTeX; pages
 * without math load nothing extra. Supported ways of writing math:
 *
 *   inline:   $x^2$        \( x^2 \)
 *   display:  $$x^2$$      \[ x^2 \]      \begin{equation} ... \end{equation}
 *
 * Write \$ for a literal dollar sign. Text inside <code>, <pre> or an element
 * with class="no-math" is left untouched.
 *
 * Shortcuts (macros) available everywhere are listed in MACROS below.
 */
(function () {
  "use strict";

  var script = document.currentScript;
  var base = (script && script.getAttribute("data-katex")) || "/assets/vendor/katex/";

  var MACROS = {
    "\\R": "\\mathbb{R}",
    "\\C": "\\mathbb{C}",
    "\\N": "\\mathbb{N}",
    "\\Z": "\\mathbb{Z}",
    "\\Q": "\\mathbb{Q}",
    "\\sech": "\\operatorname{sech}",
    "\\csch": "\\operatorname{csch}",
    "\\arcsinh": "\\operatorname{arcsinh}",
    "\\arccosh": "\\operatorname{arccosh}",
    "\\arctanh": "\\operatorname{arctanh}",
    "\\sgn": "\\operatorname{sgn}",
    "\\dd": "\\mathrm{d}",
    "\\e": "\\mathrm{e}",
    "\\ii": "\\mathrm{i}",
    "\\pd": "\\frac{\\partial #1}{\\partial #2}",
    "\\od": "\\frac{\\mathrm{d} #1}{\\mathrm{d} #2}",
    "\\abs": "\\left|#1\\right|",
    "\\norm": "\\left\\lVert#1\\right\\rVert",
    "\\vect": "\\boldsymbol{#1}"
  };

  var DELIMITERS = [
    { left: "$$", right: "$$", display: true },
    { left: "\\[", right: "\\]", display: true },
    { left: "\\begin{equation}", right: "\\end{equation}", display: true },
    { left: "\\begin{equation*}", right: "\\end{equation*}", display: true },
    { left: "\\begin{align}", right: "\\end{align}", display: true },
    { left: "\\begin{align*}", right: "\\end{align*}", display: true },
    { left: "\\begin{gather}", right: "\\end{gather}", display: true },
    { left: "\\(", right: "\\)", display: false },
    { left: "$", right: "$", display: false }
  ];

  // Does the page contain anything that looks like LaTeX?
  function hasMath(root) {
    var text = root.textContent || "";
    return /\$[^$\s][^$]*\$|\\\(|\\\[|\\begin\{(equation|align|gather)/.test(text);
  }

  function loadCSS(href) {
    if (document.querySelector('link[href="' + href + '"]')) return;
    var l = document.createElement("link");
    l.rel = "stylesheet"; l.href = href;
    document.head.appendChild(l);
  }

  function loadJS(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = src; s.onload = resolve; s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  // Literal dollar signs written as \$ are hidden from the math renderer,
  // then shown as plain "$".
  var DOLLAR = "\uE000";
  function eachText(root, fn) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        return n.parentNode && n.parentNode.closest("script, style, code, pre, textarea, .no-math")
          ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(fn);
  }

  function typeset() {
    if (!hasMath(document.body)) {
      eachText(document.body, function (n) { if (n.nodeValue.indexOf("\\$") !== -1) n.nodeValue = n.nodeValue.replace(/\\\$/g, "$"); });
      return;
    }
    eachText(document.body, function (n) { if (n.nodeValue.indexOf("\\$") !== -1) n.nodeValue = n.nodeValue.replace(/\\\$/g, DOLLAR); });
    loadCSS(base + "katex.min.css");
    loadJS(base + "katex.min.js")
      .then(function () { return Promise.all([loadJS(base + "auto-render.min.js"), loadJS(base + "copy-tex.min.js")]); })
      .then(function () {
        window.renderMathInElement(document.body, {
          delimiters: DELIMITERS,
          macros: MACROS,
          throwOnError: false,
          strict: "ignore",
          ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code", "option"],
          ignoredClasses: ["no-math"]
        });
      })
      .catch(function () { /* if KaTeX cannot load, the LaTeX source stays readable */ })
      .then(function () {
        eachText(document.body, function (n) { if (n.nodeValue.indexOf(DOLLAR) !== -1) n.nodeValue = n.nodeValue.split(DOLLAR).join("$"); });
        document.documentElement.classList.add("math-ready");
      });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", typeset);
  else typeset();
})();
