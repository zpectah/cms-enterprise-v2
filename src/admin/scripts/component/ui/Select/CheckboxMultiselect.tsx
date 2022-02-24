import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemText, { ListItemTextProps } from '@mui/material/ListItemText';

import Checkbox, { CheckboxProps } from '../Checkbox/Checkbox';
import MultiselectBase, { MultiselectBaseProps } from './Multiselect.Base';

export interface CheckboxMultiselectProps extends MultiselectBaseProps {
	listItemTextProps?: ListItemTextProps;
	checkboxProps?: CheckboxProps;
}

const CheckboxMultiselect: React.FC<CheckboxMultiselectProps> = (props) => {
	const {
		options = [],
		value,
		listItemTextProps,
		checkboxProps,
		...rest
	} = props;

	return (
		<MultiselectBase
			value={value}
			{...rest}
		>
			{options.map((option) => {
				const {
					key,
					label,
					...rest
				} = option;
				const selected = value as (string | number )[];
				const itemValue = option.value as string | number;
				const itemChecked = selected.indexOf(itemValue) > -1;

				return (
					<MenuItem
						key={key}
						{...rest}
					>
						<Checkbox
							checked={itemChecked}
							{...checkboxProps}
						/>
						<ListItemText
							primary={label}
							{...listItemTextProps}
						/>
					</MenuItem>
				);
			})}
		</MultiselectBase>
	);
};

export default CheckboxMultiselect;