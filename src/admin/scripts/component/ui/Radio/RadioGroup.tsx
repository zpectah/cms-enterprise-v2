import React from 'react';
import { default as MuiRadioGroup, RadioGroupProps as MuiRadioGroupProps } from '@mui/material/RadioGroup';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import FormLabel, { FormLabelProps } from '@mui/material/FormLabel';

import { string } from '../../../../../../utils/helpers';
import Radio, { RadioProps } from './Radio';

export interface RadioItemProps extends RadioProps {
	key: string | number;
	label: string;
}
export interface RadioGroupProps extends MuiRadioGroupProps {
	items: RadioItemProps[];
	label?: string;
	formControlProps?: FormControlProps;
	formLabelProps?: FormLabelProps;
	formControlLabelProps?: FormControlLabelProps;
}

const RadioGroup = (props: RadioGroupProps) => {
	const {
		items = [],
		label,
		id = string.getToken(3, ''),
		formControlProps,
		formLabelProps = {
			id: `${id}_label`,
		},
		formControlLabelProps,
		...rest
	} = props;

	return (
		<FormControl
			{...formControlProps}
		>
			{label && (
				<FormLabel
					{...formLabelProps}
				>{label}</FormLabel>
			)}
			<MuiRadioGroup
				aria-labelledby={`${id}_label`}
				{...rest}
			>
				{items.map((item) => {
					const {
						key,
						label,
						...rest
					} = item;

					return (
						<FormControlLabel
							key={key}
							label={label}
							control={
								<Radio {...rest} />
							}
							{...formControlLabelProps}
						/>
					);
				})}
			</MuiRadioGroup>
		</FormControl>
	);
};

export default RadioGroup;