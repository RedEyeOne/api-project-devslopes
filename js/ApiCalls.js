let margaritaUrl =
	"https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";
console.log("Fetching:", margaritaUrl);

fetch(margaritaUrl)
	.then((fetchData) => {
		console.log("Raw response:", fetchData);
		return fetchData.json();
	})
	.then((urlJson) => {
		console.log("Parsed JSON:", urlJson);
	});
