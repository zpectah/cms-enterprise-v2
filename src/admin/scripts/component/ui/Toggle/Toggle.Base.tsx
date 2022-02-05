import React from 'react';
import ToggleButton, { ToggleButtonProps } from '@mui/material/ToggleButton';
import ToggleButtonGroup, { ToggleButtonGroupProps } from '@mui/material/ToggleButtonGroup';

export interface ToggleItemProps extends ToggleButtonProps {
	key: string | number;
}
export interface ToggleBaseProps extends ToggleButtonGroupProps {
	items: ToggleItemProps[];
}

const ToggleBase = (props: ToggleBaseProps) => {
	const {
		items = [],
		...rest
	} = props;

	return (
		<ToggleButtonGroup
			{...rest}
		>
			{items.map((item) => {
				const {
					key,
					...rest
				} = item;

				return (
					<ToggleButton
						key={key}
						{...rest}
					/>
				);
			})}
		</ToggleButtonGroup>
	);
};

export default ToggleBase;
