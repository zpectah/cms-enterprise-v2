import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';

import SelectBase, { SelectBaseProps } from './Select.Base';

export interface MultiselectBaseProps extends SelectBaseProps {
	paperMaxHeight?: string | number;
	paperWidth?: string | number;
	value: (string | number)[];
}

const MultiselectBase: React.FC<MultiselectBaseProps> = (props) => {
	const {
		children,
		paperMaxHeight = "350px",
		paperWidth = "100%",
		label,
		...rest
	} = props;

	const menuProps = {
		PaperProps: {
			style: {
				maxHeight: paperMaxHeight,
				width: paperWidth,
			},
		},
	};

	return (
		<SelectBase
			multiple
			label={label}
			input={<OutlinedInput label={label} />}
			MenuProps={menuProps}
			{...rest}
		/>
	);
};

export default MultiselectBase;