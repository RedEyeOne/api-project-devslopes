import { getRandomDrink } from "./ApiCalls.js";

const drinkContainerPointer = ".drink-container";
const drinkContainer = document.querySelector(drinkContainerPointer);

export function createDrinkCard(drink) {
	//first create the individual elements dynamicly
	const card = document.createElement("div");
	card.classList.add("card");
	drinkContainer.appendChild(card);

	const cardTitle = document.createElement("h3");
	cardTitle.innerHTML = drink.strDrink;
	card.appendChild(cardTitle);

	const cardImg = document.createElement("img");
	cardImg.src = drink.strDrinkThumb;
	cardImg.classList.add();

	const category = document.createElement("h3");
	category.innerHTML = drink.strCategory;

	let alcoholType = null;
	if (drink.strAlcoholic !== "Alcoholic") {
		alcoholType = document.createElement("h5");
		alcoholType.innerHTML = `* ${drink.strAlcoholic} *`;
	}
	const id = drink.idDrink;
	card.id = id;

	//append everything to create the actual card in html
	drinkContainer.appendChild(card);
	card.appendChild(cardTitle);
	card.appendChild(cardImg);
	card.appendChild(category);
	if (drink.strAlcoholic !== "Alcoholic") {
		card.appendChild(alcoholType);
	}
}
getRandomDrink(10).then((drink) => {
	console.log("Function BBall:", drink);
	drink.forEach((drink) => createDrinkCard(drink));
});
