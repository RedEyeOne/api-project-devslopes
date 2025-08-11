const sortSection = document.querySelector("#sort-by-select");
const drinkContainer = document.querySelector(".drink-container");
const favsContainer = document.querySelector(".favs-container");

export const allCards = [];

function filterDrinksByType(type) {
	allCards.forEach((card) => {
		const isFavorite = card.classList.contains("favorite");
		const cardType = card.querySelector(".type").textContent;
		if (isFavorite) {
			// Show favorites and ensure favs
			// are in favsContainer
			card.style.display = "";
			if (card.parentElement !== favsContainer)
				favsContainer.appendChild(card);
		} else {
			// Show non-favorites matching the filter and keep in drinksontainer
			if (cardType === type) {
				card.style.display = "";
				if (card.parentElement !== drinkContainer) {
					drinkContainer.appendChild(card);
				}
			} else card.style.display = "none";
		}
	});
}

function sortBy(value) {
	//grab only cards from the randoms section
	const cardsDom = drinkContainer.querySelectorAll(".card");
	cardsDom.forEach((card) => {
		card.style.display = ""; // show everything
	});
	const cards = [...cardsDom];
	switch (value) {
		case "sort-by":
			break;
		case "a-z":
			cards.sort((a, b) => {
				const nameA = a.querySelector("h3").innerText.toLowerCase();
				const nameB = b.querySelector("h3").innerText.toLowerCase();
				return nameA.localeCompare(nameB);
			});
			break;
		case "z-a":
			cards.sort((a, b) => {
				const nameA = a.querySelector("h3").innerText.toLowerCase();
				const nameB = b.querySelector("h3").innerText.toLowerCase();
				return nameB.localeCompare(nameA);
			});
			break;
		case "type":
			cards.sort((a, b) => {
				const nameA = a.querySelector(".type").innerText.toLowerCase();
				const nameB = b.querySelector(".type").innerText.toLowerCase();
				return nameA.localeCompare(nameB);
			});
			break;

		default:
			filterDrinksByType(value);
			break;
	}
	cards.forEach((card) => drinkContainer.appendChild(card));
}

function onSortSectionClick(event) {
	if (event.target.tagName === "SELECT") {
		sortBy(event.target.value);
	}
}

sortSection.addEventListener("change", onSortSectionClick);
