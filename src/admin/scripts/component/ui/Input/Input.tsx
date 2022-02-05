import React from 'react';

import InputBase, { InputBaseProps } from './Input.Base';

interface InputProps {}

const Input = (props: InputProps & InputBaseProps) => {
	const {
		...rest
	} = props;

	return (
		<InputBase
			{...rest}
		/>
	);
};

export default Input;