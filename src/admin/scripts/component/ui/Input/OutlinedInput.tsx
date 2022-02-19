import React from 'react';
import { default as MuiOutlinedInput, OutlinedInputProps as MuiOutlinedInputProps } from '@mui/material/OutlinedInput';

import getTestDataAttr from '../../../utils/getTestDataAttr';

export interface OutlinedInputProps extends MuiOutlinedInputProps {
	dataId?: string;
}

const OutlinedInput = (props: OutlinedInputProps) => {
	const {
		dataId = 'outlined-input',
		...rest
	} = props;

	return (
		<MuiOutlinedInput
			size="small"
			{...rest}
			{...getTestDataAttr(dataId)}
		/>
	);
};

export default OutlinedInput;