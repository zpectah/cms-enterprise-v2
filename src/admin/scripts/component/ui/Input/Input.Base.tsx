import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

import { getTestDataAttr } from '../../../utils';

export interface DefaultInputBaseProps {
	dataId?: string;
}
export type InputBaseProps = DefaultInputBaseProps & TextFieldProps;

const InputBase = (props: InputBaseProps) => {
	const {
		dataId = 'input-text',
		...rest
	} = props;

	return (
		<TextField
			fullWidth
			variant="outlined"
			size="small"
			{...rest}
			{...getTestDataAttr(dataId)}
		/>
	);
};

export default InputBase;