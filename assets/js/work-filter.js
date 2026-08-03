// Filters .work-card elements by data-categories, driven by .work-filter__btn
// clicks. No dependencies — safe to include on any Jekyll page as-is.
document.addEventListener("DOMContentLoaded", function () {
  var filterBar = document.querySelector(".work-filter");
  var cards = document.querySelectorAll(".work-card");

  if (!filterBar || !cards.length) return;

  filterBar.addEventListener("click", function (e) {
    var btn = e.target.closest(".work-filter__btn");
    if (!btn) return;

    filterBar
      .querySelectorAll(".work-filter__btn")
      .forEach(function (b) { b.classList.remove("is-active"); });
    btn.classList.add("is-active");

    var filter = btn.dataset.filter;

    cards.forEach(function (card) {
      var cats = (card.dataset.categories || "").split(", ");
      var show = filter === "all" || cats.indexOf(filter) !== -1;
      card.hidden = !show;
    });
  });
});
