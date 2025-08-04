import { favoritesApiFetch } from "./ApiCalls.js";
import { createDrinkCard } from "./dynamic.js";
let favsContainer = document.querySelector(".favs-container");
let cardsContainer = document.querySelector(".drink-container");
function getFavorites() {
	return JSON.parse(localStorage.getItem("favs")) || [];
}
function setFavs(favs) {
	localStorage.setItem("favs", JSON.stringify(favs));
}
function addToFavorites(id) {
	let card = document.getElementById(id);
	card.classList.add("favorite");
	favsContainer.appendChild(card);

	const favs = getFavorites();
	if (!favs.includes(id)) {
		favs.push(id);
		setFavs(favs);
	}
}
function removeFromFavs(id) {
	let card = document.getElementById(id);
	card.classList.remove("favorite");
	cardsContainer.appendChild(card);

	const favs = getFavorites().filter((favId) => favId !== id);
	setFavs(favs);
}

function createFavoriteDrink(id) {}

function synchStorage() {
	const favs = getFavorites();
	favoritesApiFetch(favs).then((data) => {
		data.forEach((drink) => {
			createDrinkCard(drink);
			addToFavorites(drink.idDrink);
		});
	});
}
function onItemClick(event) {
	const card = event.target.closest(".card");

	if (!card) return;

	const id = card.id;
	const favs = getFavorites();
	const isFavorite = favs.includes(id);

	if (!isFavorite) {
		addToFavorites(id);
	} else {
		removeFromFavs(id);
	}
}
favsContainer.addEventListener("click", onItemClick);
cardsContainer.addEventListener("click", onItemClick);
synchStorage();
