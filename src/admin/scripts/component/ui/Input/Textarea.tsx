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
			inputProps={{
				wrap: 'hard',
				resize: 'vertical',
			}}
			{...rest}
		/>
	);
};

export default Textarea;