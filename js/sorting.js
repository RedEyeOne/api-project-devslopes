//grab only cards from the randoms section
const cards = document.querySelectorAll(".card");

const randomsSection = document.querySelector(".randoms-section");

function renderDrinks(drinksArray) {
	drinksArray.forEach((drink) => {
		randomsSection.appendChild(drink);
	});
}

function sortBy(value) {
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
		case "value":

		default:
			break;
	}
	cards.forEach((card) => randomsSection.appendChild(card));
}
