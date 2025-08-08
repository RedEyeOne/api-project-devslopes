const sortSection = document.querySelector("#sort-by-select");
const drinkContainer = document.querySelector(".drink-container");
export const allCards = [];

function filterDrinksByType(type) {
	const allCards = document.querySelectorAll(".card");
	allCards.forEach((card) => {
		const cardType = card.querySelector(".type").textContent;
		card.style.display = cardType === type ? "" : "none";
	});
}

function sortBy(value) {
	//grab only cards from the randoms section
	const randomsSection = document.querySelector(".drink-container");
	allCards.forEach((card) => {
		card.style.display = ""; // show everything
	});
	const cards = [...allCards];
	switch (value) {
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
			console.log("case: type");
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
	cards.forEach((card) => randomsSection.appendChild(card));
}

function onSortSectionClick(event) {
	if (event.target.tagName === "SELECT") {
		sortBy(event.target.value);
		console.log("Sort By: ", event.target.value);
	}
}

sortSection.addEventListener("change", onSortSectionClick);
