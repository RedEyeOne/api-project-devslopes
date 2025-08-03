export function getRandomDrink(num) {
	let randomDrinkUrl =
		"https://www.thecocktaildb.com/api/json/v1/1/random.php";
	//create variables
	const fetchPromises = [];

	//loop based on argument
	while (num > 0) {
		const promise = fetch(randomDrinkUrl)
			.then((fetchData) => {
				return fetchData.json();
			})
			.then((urlJson) => {
				return urlJson.drinks[0];
			});
		fetchPromises.push(promise);
		num--;
	}

	return Promise.all(fetchPromises);
}
getRandomDrink(5).then((data) => console.log("Function call:", data));
