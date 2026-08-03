document.addEventListener("DOMContentLoaded", function () {
  var buttons = document.querySelectorAll(".work-filter__btn");
  var cards = document.querySelectorAll(".work-card");
  var STAGGER_DELAY = 80; // ms between each card's fade-in
  var FADE_DURATION = 250; // must match CSS transition duration (ms)
  var FADE_DURATION_IN = 200;
  var FADE_DURATION_OUT = 200;
  var STAGGER_DELAY_START = 120;

  function showCardsStart(matchingCards) {
    var delay = 0;
    matchingCards.forEach(function (card) {
      card.style.display = "block";
      void card.offsetWidth; // force reflow before animating

      setTimeout(function () {
        card.classList.add("is-visible");
      }, delay);
      delay += STAGGER_DELAY;
    });
  }


  function showCards(matchingCards) {
    var delay = 0;
    matchingCards.forEach(function (card) {
      card.style.display = "block";
      void card.offsetWidth; // force reflow before animating

      setTimeout(function () {
        card.classList.add("is-visible");
      }, delay);

      delay += STAGGER_DELAY;
    });
  }

  function hideAllCards() {
    cards.forEach(function (card) {
      card.classList.remove("is-visible");
    });
  }

  function applyFilter(filter) {
    hideAllCards();

    setTimeout(function () {
      var matching = [];

      cards.forEach(function (card) {
        // fully remove non-matching cards from layout first
        card.style.display = "none";

        var cardCategories = card.getAttribute("data-categories").split(",");
        var matches = filter === "all" || cardCategories.includes(filter);

        if (matches) {
          matching.push(card);
        }
      });

      showCards(matching);
    }, FADE_DURATION_IN);
  }

  // fade in all cards on initial page load
  showCardsStart(Array.from(cards));

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      var filter = button.getAttribute("data-filter");

      buttons.forEach(function (btn) {
        btn.classList.remove("active");
      });
      button.classList.add("active");

      applyFilter(filter);
    });
  });
});