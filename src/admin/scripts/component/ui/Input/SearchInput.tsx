import React, { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel, { InputLabelProps } from '@mui/material/InputLabel';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';

import OutlinedInput, { OutlinedInputProps } from './OutlinedInput';

export interface SearchInputProps {
	formControlProps?: FormControlProps;
	inputLabelProps?: InputLabelProps;
	inputType?: 'text' | 'search';
}

const SearchInput = (props: SearchInputProps & OutlinedInputProps) => {
	const {
		label,
		required,
		formControlProps = {
			variant: 'outlined',
			fullWidth: true,
			size: 'small',
		},
		inputLabelProps,
		inputType = 'search',
		...rest
	} = props;

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
				type={inputType}
				startAdornment={
					<InputAdornment position="start">
						<SearchIcon fontSize="small" />
					</InputAdornment>
				}
				label={label}
				required={required}
				{...rest}
			/>
		</FormControl>
	);
};

export default SearchInput;
