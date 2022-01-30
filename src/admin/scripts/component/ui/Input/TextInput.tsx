import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

import getTestDataAttr from '../../../utils/getTestDataAttr';

interface TextInputProps {
	dataId?: string;
}

const TextInput = (props: TextInputProps & TextFieldProps) => {
	const {
		dataId = 'button-base',
		...rest
	} = props;

	return (
		<TextField
			variant="outlined"
			{...rest}
			{...getTestDataAttr(dataId)}
		/>
	);
};

export default TextInput;