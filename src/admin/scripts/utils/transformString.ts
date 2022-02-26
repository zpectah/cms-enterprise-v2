export default (
	input: string,
	method: 'empty-space' | 'empty-to-dash' | 'empty-to-dot',
): string => {
	let output: string;

	switch (method) {

		case 'empty-space':
			output = input.split(' ').join('');
			break;

		case 'empty-to-dash':
			output = input.split(' ').join('-');
			break;

		case 'empty-to-dot':
			output = input.split(' ').join('.');
			break;

	}

	return output;
};
