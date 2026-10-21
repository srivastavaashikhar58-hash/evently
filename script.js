const searchForm = document.querySelector('form[role="search"]');
const searchInput = document.querySelector("#event-search");
const citySelect = document.querySelector("#event-city");
const categoryButtons = document.querySelectorAll(".category-filter");
const eventCards = document.querySelectorAll(".event-card");
const resultsMessage = document.querySelector("#results-message");

let selectedCategory = "all";

function updateVisibleEvents() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedCity = citySelect.value;
  let matchingEvents = 0;

  eventCards.forEach((eventCard) => {
    const categoryMatches =
      selectedCategory === "all" || eventCard.dataset.category === selectedCategory;
    const cityMatches =
      selectedCity === "all-india" || eventCard.dataset.city === selectedCity;
    const searchMatches = eventCard.textContent.toLowerCase().includes(searchTerm);
    const shouldShow = categoryMatches && cityMatches && searchMatches;

    eventCard.hidden = !shouldShow;

    if (shouldShow) {
      matchingEvents += 1;
    }
  });

  if (matchingEvents === 0) {
    resultsMessage.textContent = "No upcoming events match those filters yet.";
    return;
  }

  const eventWord = matchingEvents === 1 ? "event" : "events";
  resultsMessage.textContent = `Showing ${matchingEvents} upcoming ${eventWord}.`;
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  updateVisibleEvents();
});

searchInput.addEventListener("input", updateVisibleEvents);
citySelect.addEventListener("change", updateVisibleEvents);

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;

    categoryButtons.forEach((filterButton) => {
      filterButton.setAttribute("aria-pressed", String(filterButton === button));
    });

    updateVisibleEvents();
  });
});

updateVisibleEvents();
