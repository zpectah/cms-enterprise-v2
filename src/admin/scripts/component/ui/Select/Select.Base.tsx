import React from 'react';
import InputLabel, { InputLabelProps } from '@mui/material/InputLabel';
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import { default as MuiSelect, SelectProps as MuiSelectProps } from '@mui/material/Select';

import { string } from '../../../../../../utils/helpers';
import getTestDataAttr from '../../../utils/getTestDataAttr';

export interface OptionsItemProps extends MenuItemProps {
	key: string | number;
	label: string;
}
export interface SelectBaseProps extends MuiSelectProps {
	dataId?: string;
	options?: OptionsItemProps[];
	formControlProps?: FormControlProps;
	inputLabelProps?: InputLabelProps;
}

const SelectBase: React.FC<SelectBaseProps> = (props) => {
	const {
		dataId = 'input-select',
		children,
		options = [],
		id,
		label,
		required,
		formControlProps = {
			fullWidth: true,
		},
		inputLabelProps,
		size = 'small',
		...rest
	} = props;

	console.log('inputId', id);

	return (
		<FormControl
			size={size}
			{...formControlProps}
		>
			{label && (
				<InputLabel
					id={`${id}_label`}
					htmlFor={id}
					{...inputLabelProps}
				>
					{label}{required && ' *'}
				</InputLabel>
			)}
			<MuiSelect
				fullWidth
				labelId={label && `${id}_label`}
				id={id}
				label={label}
				required={required}
				size={size}
				{...rest}
				{...getTestDataAttr(dataId)}
			>
				{options.map((option) => {
					const {
						key,
						label,
						...rest
					} = option;

					return (
						<MenuItem
							key={key}
							{...rest}
						>
							{label}
						</MenuItem>
					);
				})}
				{children}
			</MuiSelect>
		</FormControl>
	);
};

export default SelectBase;
