import { callFromApi } from "./ApiCalls.js";
import { allCards } from "./sorting.js";

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
	allCards.push(card);
	return card;
}
function retryForDuplicates(newDrinks) {
	newDrinks.forEach((drink) => {
		uniqueMap.set(drink.idDrink, drink);
	});
	if (uniqueMap.size < targetCount) {
		const remaining = targetCount - uniqueMap.size;
		return callFromApi(randomUrl, remaining).then(retryForDuplicates);
	} else {
		const finalDrinks = [...uniqueMap.values()];
		finalDrinks.forEach((drink) => {
			createDrinkCard(drink);
		});
		return Promise.resolve(finalDrinks);
	}
}
// count drink types with count

function createTypeSortDynamic(type, count) {
	const sortSection = document.getElementById("sort-by-select");

	const createOption = (type, count) => {
		return `<option value="${type}">${type} (${count})</option>`;
	};

	sortSection.innerHTML += createOption(type, count);
}

function countTypesFromData(drinks) {
	const typeMap = new Map();
	drinks.forEach((drink) => {
		const type = drink.strCategory?.trim() || "Unknown";
		if (typeMap.has(type)) {
			typeMap.set(type, typeMap.get(type) + 1);
		} else {
			typeMap.set(type, 1);
		}
	});
	return typeMap;
}

function filterDrinksByType(type, allCards) {
	drinkContainer.innerHTML = "";
	const matches = allDrinkCards.filter(
		(card) => card.querySelector(".type").textContent === type
	);
	console.log("Matches found:", matches.length, matches);
	matches.forEach((drink) => {
		const card = createDrinkCard(drink);
		drinkContainer.appendChild(card);
	});
}

callFromApi(randomUrl, targetCount)
	.then(retryForDuplicates)
	// handle
	.then((finalDrinks) => {
		console.log("final drinks: ", finalDrinks);
		const typeMap = countTypesFromData(finalDrinks);
		typeMap.forEach((count, type) => {
			createTypeSortDynamic(type, count);
		});
		// document
		// 	.getElementById("sort-by-select")
		// 	.addEventListener("change", (e) => {
		// 		const selectedType = e.target.value;
		// 		filterDrinksByType(selectedType, finalDrinks);
		// 	});
	});
