export default (
	input: string,
	method: 'empty-space' | 'empty-dash',
): string => {
	let output: string;

	switch (method) {

		case 'empty-space':
			output = input.split(' ').join('');
			break;

		case 'empty-dash':
			output = input.split(' ').join('-');
			break;

	}

	return output;
};
