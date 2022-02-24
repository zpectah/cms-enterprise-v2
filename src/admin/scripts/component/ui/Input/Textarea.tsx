import React from 'react';

import InputBase, { InputBaseProps } from './Input.Base';

export interface TextareaProps {}

const Textarea = (props: TextareaProps & InputBaseProps) => {
	const {
		...rest
	} = props;

	return (
		<InputBase
			multiline
			rows={5}
			{...rest}
		/>
	);
};

export default Textarea;