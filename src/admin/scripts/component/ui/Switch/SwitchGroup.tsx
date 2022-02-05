import React from 'react';
import FormGroup, { FormGroupProps } from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import Switch, { SwitchProps } from './Switch';

interface SwitchItemProps extends SwitchProps {
	key: string | number;
	label: string;
}
interface SwitchGroupProps extends FormGroupProps {
	items: SwitchItemProps[];
}

const SwitchGroup = (props: SwitchGroupProps) => {
	const {
		items = [],
		...rest
	} = props;

	return (
		<FormGroup
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
						control={<Switch {...rest} />}
					/>
				);
			})}
		</FormGroup>
	);
};

export default SwitchGroup;
