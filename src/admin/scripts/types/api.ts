export interface apiRequestHeadersProps {
	headers: {
		[k: string]: string;
	};
}

export interface apiResponseDefaultProps {
	data: any[];
	status: 'ok' | 'error';
	message: string;
}