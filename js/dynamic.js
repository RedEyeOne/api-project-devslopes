import { callFromApi } from "./ApiCalls.js";

//callback variables
const randomUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
const targetCount = 30;
const uniqueMap = new Map();
const allCards = [];

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
function retryForDuplicates(newDrinks) {
	newDrinks.forEach((drink) => {
		uniqueMap.set(drink.idDrink, drink);
	});
	if (uniqueMap.size < targetCount) {
		const remaining = targetCount - uniqueMap.size;
		callFromApi(randomUrl, remaining).then(retryForDuplicates);
	} else {
		const finalDrinks = [...uniqueMap.values()];
		console.log(finalDrinks);
		finalDrinks.forEach((drink) => {
			createDrinkCard(drink);
		});
		return Promise.resolve(finalDrinks);
	}
}
// count drink types with count
function countTypes(typesList) {
	const typeMap = new Map();
	typesList.forEach((individual) => {
		const type = individual.innerText;
		if (typeMap.has(type)) {
			typeMap.set(type, typeMap.get(type) + 1);
		} else {
			typeMap.set(type, 1);
		}
	});
	console.log(typeMap);
	return typeMap;
}

function createTypeSortDynamic(type, count) {
	const sortSection = document.getElementById("sort-by-select");

	const createOption = (type, count) => {
		return `<option value="${type}">${type} (${count})</option>`;
	};

	sortSection.innerHTML += createOption(type, count);
}

function filterDrinksByType(type) {
	const allCards = Array.from(drinkContainer.children);

	// Clear the container
	drinkContainer.innerHTML = "";

	// Re-add only matching cards
	allCards.forEach((card) => {
		const typeText = card.querySelector(".type").innerHTML;
		if (typeText === type) {
			drinkContainer.appendChild(card);
		}
	});
}
function countTypesFromData(drinks) {
	const typeMap = new Map();

	drinks.forEach((drink) => {
		const type = drink.strCategory?.trim() || "Unknown";
		if (typeMap.type) {
			typeMap.set(type, typeMap.get(type) + 1);
		} else {
			typeMap.set(type, 1);
		}
	});
	console.log("From function: ", typeMap);
	return typeMap;
}

callFromApi(randomUrl, targetCount)
	.then(retryForDuplicates)
	// handle
	.then((finalDrinks) => {
		const typeMap = countTypesFromData(finalDrinks);
		console.log(typeMap);
		typeMap.forEach((count, type) => {
			createTypeSortDynamic(type, count);
		});
		console.log(allCards);
		document
			.getElementById("sort-by-select")
			.addEventListener("change", (e) => {
				const selectedType = e.target.value;
				filterDrinksByType(selectedType);
			});
	});

// callFromApi(randomUrl, 30).then((drink) => {
// 	console.log("Drinks Data:", drink);
// 	drink.forEach((drink) => createDrinkCard(drink));
// });
