const sortSection = document.querySelector("#sort-by-select");

function renderDrinks(drinksArray) {
	drinksArray.forEach((drink) => {
		randomsSection.appendChild(drink);
	});
}

function sortBy(value) {
	//grab only cards from the randoms section
	const randomsSection = document.querySelector(".drink-container");

	const cards = [...randomsSection.querySelectorAll(".card")];
	switch (value) {
		case "a-z":
			console.log("case: a-z");
			cards.sort((a, b) => {
				const nameA = a.querySelector("h3").innerText.toLowerCase();
				const nameB = b.querySelector("h3").innerText.toLowerCase();
				return nameA.localeCompare(nameB);
			});
			break;
		case "z-a":
			console.log("case: z-a");
			cards.sort((a, b) => {
				const nameA = a.querySelector("h3").innerText.toLowerCase();
				const nameB = b.querySelector("h3").innerText.toLowerCase();
				return nameB.localeCompare(nameA);
			});
			break;
		case "type":
			console.log("case: type");
			cards.sort((a, b) => {
				const nameA = a.querySelector("h3").innerText.toLowerCase();
				const nameB = b.querySelector("h3").innerText.toLowerCase();
				return nameA.localeCompare(nameB);
			});

		default:
			console.log("default");
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
