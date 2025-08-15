import { createCounters } from "./dynamic.js";

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

function sortCards(direction, selector, cards) {
    cards.sort((a, b) => {
        const nameA = a.querySelector(selector).innerText.toLowerCase();
        const nameB = b.querySelector(selector).innerText.toLowerCase();
        switch (direction) {
            case "a-z":
                return nameA.localeCompare(nameB);
            case "z-a":
                return nameB.localeCompare(nameA);
            case "type":
                return nameA.localeCompare(nameB);
        }
    });
}

function sortBy(value) {
    const cardsDom = drinkContainer.querySelectorAll(".card");
    //grab only cards from the randoms section
    cardsDom.forEach((card) => {
        card.style.display = ""; // show everything
    });
    const cards = [...allCards];

    switch (value) {
        case "sort-by":
            break;
        case "a-z":
            sortCards(value, "h3", cards);
            break;
        case "z-a":
            sortCards(value, "h3", cards);
            break;
        case "type":
            sortCards(value, ".type", cards);
            break;

        default:
            filterDrinksByType(value);
            break;
    }
    cards.forEach((card) => drinkContainer.appendChild(card));
    createCounters(".drink-container");
}

function onSortSectionClick(event) {
    if (event.target.tagName === "SELECT") {
        sortBy(event.target.value);
    }
}

sortSection.addEventListener("change", onSortSectionClick);
