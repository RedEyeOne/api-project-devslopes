export function callFromApi(url, loops) {
	const fetchPromises = [];

	while (loops > 0) {
		let promise = fetch(url)
			.then((fetchData) => {
				return fetchData.json();
			})
			.then((urlJson) => {
				return urlJson.drinks[0];
			});
		fetchPromises.push(promise);
		loops--;
	}

	return Promise.all(fetchPromises);
}

// export function getRandomDrink(num) {
// 	let randomDrinkUrl =
// 		"https://www.thecocktaildb.com/api/json/v1/1/random.php";
// 	//create variables
// 	const fetchPromises = [];

// 	//loop based on argument
// 	while (num > 0) {
// 		let promise = fetch(randomDrinkUrl)
// 			.then((fetchData) => {
// 				return fetchData.json();
// 			})
// 			.then((urlJson) => {
// 				return urlJson.drinks[0];
// 			});
// 		fetchPromises.push(promise);
// 		num--;
// 	}

// 	return Promise.all(fetchPromises);
// }

// export function favoritesApiFetch(favs) {
// 	let fetchPromises = [];
// 	favs.forEach((id) => {
// 		const favDrinkUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
// 		let promise = fetch(favDrinkUrl)
// 			.then((fetchData) => {
// 				return fetchData.json();
// 			})
// 			.then((urlJson) => {
// 				return urlJson.drinks[0];
// 			});
// 		fetchPromises.push(promise);
// 	});
// 	return Promise.all(fetchPromises);
// }
