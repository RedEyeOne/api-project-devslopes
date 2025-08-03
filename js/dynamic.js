import { getRandomDrink } from "./ApiCalls.js";

const drinkContainerPointer = ".drink-container";
const drinkContainer = document.querySelector(drinkContainerPointer);

function createDrinkCard(drink) {
	//first create the individual elements dynamicly
	const card = document.createElement("div");
	card.classList.add("drinkCard");
	drinkContainer.appendChild(card);

	const cardTitle = document.createElement("h3");
	cardTitle.innerHTML = drink.strDrink;
	card.appendChild(cardTitle);

	//append everything to create the actual card in html
	drinkContainer.appendChild(card);
	card.appendChild(cardTitle);
	console.log(cardTitle);
}
getRandomDrink(10).then((drink) => {
	console.log("Function BBall:", drink);
	drink.forEach((drink) => createDrinkCard(drink));
});
