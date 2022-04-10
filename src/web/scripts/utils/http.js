const init = {
	headers: {
		'Content-Type': 'application/json',
		'X-App-Token': window.APP_TOKEN,
		'X-Member-Token': window.MEMBER_TOKEN,
	},
};

export const get = async (url) => {
	const response = await fetch(url, {
		method: 'GET',
		...init,
	});
	return response.json();
};

export const post = async (url, data) => {
	const response = await fetch(url, {
		method: 'POST',
		...init,
		body: JSON.stringify(data),
	});

	return response.json();
};
