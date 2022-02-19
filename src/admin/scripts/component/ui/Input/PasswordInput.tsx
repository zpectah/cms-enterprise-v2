import React, { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel, { InputLabelProps } from '@mui/material/InputLabel';
import FormControl, { FormControlProps } from '@mui/material/FormControl';

import OutlinedInput, { OutlinedInputProps } from './OutlinedInput';
import { IconButton } from '../Button';

export interface PasswordInputProps {
	formControlProps?: FormControlProps;
	inputLabelProps?: InputLabelProps;
}

const PasswordInput = (props: PasswordInputProps & OutlinedInputProps) => {
	const {
		label,
		required,
		formControlProps = {
			variant: 'outlined',
			fullWidth: true,
			size: 'small',
		},
		inputLabelProps,
		onChange,
		value,
		...rest
	} = props;

	const [ showPassword, setShowPassword ] = useState(false);

	return (
		<FormControl
			{...formControlProps}
		>
			{label && (
				<InputLabel
					{...inputLabelProps}
				>
					{label}{required && ' *'}
				</InputLabel>
			)}
			<OutlinedInput
				type={showPassword ? 'text' : 'password'}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={() => setShowPassword(!showPassword)}
							onMouseDown={(e) => e.preventDefault()}
							edge="end"
						>
							{showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
						</IconButton>
					</InputAdornment>
				}
				label={label}
				required={required}
				value={value}
				onChange={onChange}
				{...rest}
			/>
		</FormControl>
	);
};

export default PasswordInput;