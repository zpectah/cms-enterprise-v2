const init: {
	headers: {
		[k: string]: string;
	};
} = {
	headers: {
		'Content-Type': 'application/json',
		// 'X-App-Token': '',
	},
};

export const get = async (url: string) => {
	const response = await fetch(url, {
		method: 'GET',
		...init,
	});
	return response?.json();
};

export const post = async (url: string, data: any) => {
	const response = await fetch(url, {
		method: 'POST',
		...init,
		body: JSON.stringify(data),
	});

	return response?.json();
};

export const postRaw = async (url: string, data: any) => {
	return await fetch(url, {
		method: 'POST',
		...init,
		body: JSON.stringify(data),
	});
};

export const fetcher = (url) => fetch(url, init).then((res) => res?.json());
