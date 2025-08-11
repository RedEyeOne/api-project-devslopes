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
