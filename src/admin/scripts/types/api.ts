export interface apiRequestHeadersProps {
	headers: {
		[k: string]: string;
	};
}

export interface apiResponseDefaultProps {
	data: any | any[];
	status: 'ok' | 'error';
	message: string;
}