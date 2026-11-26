(function () {
  "use strict";

  /* ---------- Mobile menu ---------- */
  var btn = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = open ? "Close" : "Menu";
    });
  }

  /* ---------- Citations: Copy citation and BibTeX ---------- */
  function splitName(name) {
    var parts = name.trim().split(/\s+/);
    var last = parts.pop();
    return { last: last, first: parts.join(" ") };
  }
  function initials(first) {
    return first.split(/\s+/).filter(Boolean).map(function (w) { return w.charAt(0).toUpperCase() + "."; }).join(" ");
  }
  function apa(p) {
    var names = p.authors.split(/,\s*/).map(function (n) {
      var s = splitName(n);
      return s.first ? s.last + ", " + initials(s.first) : s.last;
    });
    var who = names.length > 1 ? names.slice(0, -1).join(", ") + ", & " + names[names.length - 1] : names[0];
    var out = who + " (" + p.year + "). " + p.title.replace(/\.$/, "") + ". ";
    if (p.journal) {
      out += p.journal;
      if (p.volume) out += ", " + p.volume + (p.issue ? "(" + p.issue + ")" : "");
      if (p.pages) out += ", " + p.pages;
      out += ".";
    }
    if (p.doi) out += " https://doi.org/" + p.doi;
    return out;
  }
  function bibtex(p) {
    var names = p.authors.split(/,\s*/).map(function (n) {
      var s = splitName(n);
      return s.first ? s.last + ", " + s.first : s.last;
    });
    var first = splitName(p.authors.split(/,\s*/)[0]).last.replace(/[^A-Za-z]/g, "");
    var word = (p.title.match(/[A-Za-z]{4,}/) || ["paper"])[0].toLowerCase();
    var key = first.toLowerCase() + p.year + word;
    var type = p.type === "conference" ? "inproceedings" : (p.type === "book" ? "book" : (p.type === "chapter" ? "incollection" : (p.type === "thesis" ? "phdthesis" : "article")));
    var f = [
      ["author", names.join(" and ")],
      ["title", "{" + p.title + "}"],
      [type === "article" ? "journal" : "booktitle", p.journal],
      ["year", String(p.year)],
      ["volume", p.volume],
      ["number", p.issue],
      ["pages", (p.pages || "").replace(/–/g, "--")],
      ["doi", p.doi]
    ].filter(function (x) { return x[1]; });
    return "@" + type + "{" + key + ",\n" + f.map(function (x) { return "  " + x[0] + " = {" + x[1] + "}"; }).join(",\n") + "\n}";
  }
  function copy(text, button, done) {
    var old = button.textContent;
    function ok() { button.textContent = done; setTimeout(function () { button.textContent = old; }, 1600); }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(ok, function () { fallback(); });
    } else { fallback(); }
    function fallback() {
      var ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); ok(); } catch (e) { window.prompt("Copy this citation:", text); }
      document.body.removeChild(ta);
    }
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-cite]");
    if (!b) return;
    var card = b.closest("[data-pub]");
    var p; try { p = JSON.parse(card.getAttribute("data-pub")); } catch (err) { return; }
    var kind = b.getAttribute("data-cite");
    var panel = card.querySelector(".pub-card__bibtex");
    if (kind === "text") copy(apa(p), b, "Copied");
    if (kind === "bibtex") {
      var open = panel.hidden;
      if (open) panel.querySelector("code").textContent = bibtex(p);
      panel.hidden = !open;
      b.setAttribute("aria-expanded", open ? "true" : "false");
    }
    if (kind === "copy-bibtex") copy(bibtex(p), b, "Copied");
  });

  /* ---------- Publications: filter by topic and search ---------- */
  var tools = document.querySelector("[data-pub-tools]");
  if (!tools) return;
  var buttons = tools.querySelectorAll("button[data-topic]");
  var search = document.getElementById("pub-search");
  var count = document.querySelector("[data-pub-count]");
  var items = document.querySelectorAll("[data-pub-item]");
  var groups = document.querySelectorAll("[data-pub-group]");
  var empty = document.querySelector("[data-pub-empty]");
  var topic = "";

  function apply() {
    var q = (search.value || "").trim().toLowerCase();
    var shown = 0;
    items.forEach(function (el) {
      var okTopic = !topic || el.getAttribute("data-topic") === topic;
      var hay = (el.getAttribute("data-pub") || "") + " " + el.textContent;
      var okText = !q || hay.toLowerCase().indexOf(q) !== -1;
      el.hidden = !(okTopic && okText);
      if (!el.hidden) shown++;
    });
    groups.forEach(function (g) { g.hidden = !g.querySelector("[data-pub-item]:not([hidden])"); });
    count.textContent = shown + (shown === 1 ? " publication" : " publications");
    if (empty) empty.hidden = shown !== 0;
  }
  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      topic = b.getAttribute("data-topic");
      buttons.forEach(function (o) { o.setAttribute("aria-pressed", o === b ? "true" : "false"); });
      apply();
    });
  });
  search.addEventListener("input", apply);

  // Links such as /publications/?q=Tanjil open the page already filtered
  var q = new URLSearchParams(window.location.search).get("q");
  if (q) { search.value = q; apply(); }
})();
