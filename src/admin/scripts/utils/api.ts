import { apiRequestHeadersProps, apiResponseDefaultProps } from '../types/api';

const init: apiRequestHeadersProps = {
	headers: {
		'Content-Type': 'application/json',
		'X-User-Token': 'DEMO_USER_TOKEN',
		'X-App-Token': 'DEMO_APP_TOKEN',
	},
};

export const get = async (url: string): Promise<apiResponseDefaultProps> => {
	const response = await fetch(url, {
		method: 'GET',
		...init,
	});
	return response?.json();
};

export const post = async (url: string, data: unknown): Promise<apiResponseDefaultProps> => {
	const response = await fetch(url, {
		method: 'POST',
		...init,
		body: JSON.stringify(data),
	});

	return response?.json();
};

export const postRaw = async (url: string, data: unknown): Promise<any> => {
	return await fetch(url, {
		method: 'POST',
		...init,
		body: JSON.stringify(data),
	});
};

export const fetcher = (url: string) => fetch(url, init).then((res) => res?.json());
