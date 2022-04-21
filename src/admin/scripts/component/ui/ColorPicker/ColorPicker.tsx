import React, { useState, useRef } from 'react';
import {
	Stack,
	Box,
	InputAdornment,
	Menu,
	FormControl,
	InputLabel,
	SxProps,
} from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';

import config from '../../../config';
import { OutlinedInput } from '../Input';
import { IconButton } from '../Button';

export interface ColorPickerProps {
	label?: string;
	id?: string;
	error?: boolean;
	value?: string;
	placeholder?: string;
	onChange?: (color: string) => void;
	inputSx?: SxProps,
	inputRef?: React.Ref<unknown>;
	required?: boolean;
}

const ColorPicker = (props: ColorPickerProps) => {
	const {
		label,
		id,
		error,
		value,
		placeholder,
		onChange,
		inputSx,
		inputRef,
		required,
	} = props;

	const inpRef = inputRef || useRef();
	const [ inputValue, setInputValue ] = useState(value || 'rgb(41,40,45)');
	const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null);

	const open = Boolean(anchorEl);
	const openHandler = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(inpRef?.current);
	};
	const closeHandler = () => {
		setAnchorEl(null);
	};
	const changeHandler = (val) => {
		setInputValue(val);
		if (onChange) onChange(val);
	};

	return (
		<>
			<FormControl
				variant="outlined"
				size="small"
				fullWidth
			>
				{label && (
					<InputLabel
						required={required}
					>
						{label}
					</InputLabel>
				)}
				<OutlinedInput
					type="text"
					label={label}
					id={`${id}_input`}
					error={error}
					value={inputValue}
					placeholder={placeholder}
					inputRef={inpRef}
					onChange={(e) => changeHandler(e.target.value)}
					endAdornment={
						<InputAdornment position="end">
							<Stack
								direction="row"
								spacing={1}
								alignItems="center"
							>
								<div
									style={{
										width: '22px',
										height: '22px',
										backgroundColor: inputValue,
										borderRadius: '22px',
									}}
								/>
								<IconButton
									onClick={openHandler}
								>
									<PaletteIcon fontSize="small" />
								</IconButton>
							</Stack>
						</InputAdornment>
					}
					required={required}
					sx={{
						width: { xs: '100%', md: '250px' },
						...inputSx,
					}}
				/>
			</FormControl>
			<Menu
				id={`${id}_menu`}
				MenuListProps={{
					'aria-labelledby': `${id}_input`,
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={closeHandler}
			>
				<Stack
					direction="row"
					flexWrap="wrap"
					sx={{
						width: {
							sx: '100%',
							md: '225px',
						},
						p: 2,
					}}
				>
					{config.options.common.tag_colors.map((clr) => (
						<Box
							key={clr.key}
							sx={{
								width: '40px',
								height: '40px',
								margin: '.25rem',
								cursor: 'pointer',
								color: clr.textColor,
								backgroundColor: clr.color,
								borderRadius: '100%',
								boxShadow: inputValue === clr.color ? `0 0 .5rem .025rem ${clr.color}` : 'none',
							}}
							onClick={() => {
								changeHandler(clr.color);
								closeHandler();
							}}
							title={clr.key}
						/>
					))}
				</Stack>
			</Menu>

		</>
	);
};

export default ColorPicker;
