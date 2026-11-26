(function () {
  "use strict";

  // Mobile menu toggle
  var btn = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = open ? "Close" : "Menu";
    });
  }

  // Publications: filter by topic and search
  var tools = document.querySelector("[data-pub-tools]");
  if (!tools) return;
  var buttons = tools.querySelectorAll("button[data-topic]");
  var search = document.getElementById("pub-search");
  var count = document.querySelector("[data-pub-count]");
  var items = document.querySelectorAll(".pub-year .pub");
  var years = document.querySelectorAll(".pub-year");
  var topic = "";

  function apply() {
    var q = (search.value || "").trim().toLowerCase();
    var shown = 0;
    items.forEach(function (li) {
      var okTopic = !topic || li.getAttribute("data-topic") === topic;
      var okText = !q || li.textContent.toLowerCase().indexOf(q) !== -1;
      li.hidden = !(okTopic && okText);
      if (!li.hidden) shown++;
    });
    years.forEach(function (sec) {
      sec.hidden = !sec.querySelector(".pub:not([hidden])");
    });
    count.textContent = shown + (shown === 1 ? " publication" : " publications");
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      topic = b.getAttribute("data-topic");
      buttons.forEach(function (o) { o.setAttribute("aria-pressed", o === b ? "true" : "false"); });
      apply();
    });
  });
  search.addEventListener("input", apply);
})();
