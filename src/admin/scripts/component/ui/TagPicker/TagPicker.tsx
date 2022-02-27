import React, { useState } from 'react';
import {
	styled,
	Box,
	BoxProps,
	InputAdornment,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { OutlinedInput, OutlinedInputProps } from '../Input';
import { IconButton } from '../Button';
import { Chip, ChipProps } from '../Chip';

export interface TagPickerProps {
	value: (string | number)[];
	onChange: (value: (string | number)[]) => void;
	inputType?: 'text' | 'email' | 'tel' | 'number';
	boxProps?: BoxProps;
	chipProps?: ChipProps;
	inputProps?: OutlinedInputProps;
	id?: string;
	label?: string;
	placeholder?: string;
}

const ChipWrapper = styled('div')`
	max-width: 100%;
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	flex-wrap: wrap;
`;

const TagPicker = (props: TagPickerProps) => {
	const {
		value = [],
		onChange,
		inputType = 'text',
		boxProps,
		chipProps = {
			sx: {
				marginRight: 1,
				marginBottom: 1,
			},
		},
		inputProps = {
			sx: {
				width: '100%',
				paddingRight: .5,
			},
		},
		id,
		label,
		placeholder,
	} = props;

	const [ tmpValue, setTmpValue ] = useState<string | number>('');

	const addHandler = () => {
		const tmp = [ ...value ];
		const index = tmp.indexOf(tmpValue);
		if (!(index > -1)) tmp.push(tmpValue);
		setTmpValue('');
		onChange(tmp);
	};
	const removeHandler = (val) => {
		const tmp = [ ...value ];
		const index = tmp.indexOf(val);
		if (index > -1) tmp.splice(index, 1);
		onChange(tmp);
	};

	return (
		<Box
			{...boxProps}
		>
			<ChipWrapper>
				{value.map((item) => (
					<Chip
						key={item}
						label={item}
						onDelete={() => removeHandler(item)}
						{...chipProps}
					/>
				))}
			</ChipWrapper>
			<OutlinedInput
				type={inputType}
				id={id}
				label={label}
				value={tmpValue}
				placeholder={placeholder}
				onChange={(e) => setTmpValue(e.target.value)}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							disabled={tmpValue === ''}
							onClick={() => addHandler()}
						>
							<AddCircleIcon />
						</IconButton>
					</InputAdornment>
				}
				{...inputProps}
			/>
		</Box>
	);
};

export default TagPicker;
