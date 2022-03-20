import React from 'react';
import { default as MuiButtonGroup } from '@mui/material/ButtonGroup';

import { getTestDataAttr } from '../../../utils';

export interface ButtonGroupProps {
	dataId?: string;
}

const ButtonGroup: React.FC<ButtonGroupProps> = (props) => {
	const {
		dataId = 'button-group',
		children,
		...rest
	} = props;

	return (
		<MuiButtonGroup
			{...rest}
			{...getTestDataAttr(dataId)}
		>
			{children}
		</MuiButtonGroup>
	);
};

export default ButtonGroup;
