import { callFromApi } from "./ApiCalls.js";

//callback variables
const randomUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
const targetCount = 30;
const uniqueMap = new Map();

//container variable
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

	const info = document.createElement("div");
	info.classList.add("info");

	const cardImg = document.createElement("img");
	cardImg.src = drink.strDrinkThumb;

	function extractIngredients(drink) {
		const ingredients = [];

		for (let i = 1; i <= 15; i++) {
			const ingredient = drink[`strIngredient${i}`];
			if (ingredient) {
				ingredients.push(ingredient);
			} else {
				break;
			}
		}

		return ingredients;
	}
	const createIngredientsHTML = (ingredients) => {
		return `
		<ul class="info-text">
			${ingredients.map((item) => `<li>${item}</li>`).join("")}
		</ul>
	`;
	};
	info.innerHTML = createIngredientsHTML(extractIngredients(drink));

	const category = document.createElement("h3");
	category.classList.add("type");
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
	card.appendChild(info);
	info.appendChild(cardImg);
	card.appendChild(category);
	if (drink.strAlcoholic !== "Alcoholic") {
		card.appendChild(alcoholType);
	}
}
function proccessDrinks(newDrinks) {
	newDrinks.forEach((drink) => {
		uniqueMap.set(drink.idDrink, drink);
	});

	// handle duplicate drinks
	if (uniqueMap.size < targetCount) {
		const remaining = targetCount - uniqueMap.size;
		callFromApi(randomUrl, remaining).then(proccessDrinks);
	} else {
		const finalDrinks = [...uniqueMap.values()];
		console.log(finalDrinks);
		finalDrinks.forEach((drink) => {
			createDrinkCard(drink);
		});
	}
}

callFromApi(randomUrl, targetCount).then(proccessDrinks);

// callFromApi(randomUrl, 30).then((drink) => {
// 	console.log("Drinks Data:", drink);
// 	drink.forEach((drink) => createDrinkCard(drink));
// });
