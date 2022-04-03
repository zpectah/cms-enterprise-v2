import config from '../config';
import { apiRequestHeadersProps, apiResponseDefaultProps } from '../types/api';

const init: apiRequestHeadersProps = {
	headers: {
		'Content-Type': 'application/json',
		'X-App-Token': config.APP_TOKEN, // For app authorization (if request is from app) ... [for data get]
		'X-User-Token': config.USER_TOKEN, // For user authorization (if request is for logged user) ... [for rest data modification]
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
	const response = await fetch(url, {
		method: 'POST',
		...init,
		body: JSON.stringify(data),
	});

	return response;
};

export const fetcher = (url: string) => fetch(url, init).then((res) => res?.json());
