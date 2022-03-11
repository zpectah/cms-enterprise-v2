import React from 'react';
import AdapterLuxon from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker, { DatePickerProps } from '@mui/lab/DatePicker';

import Input from './Input';

export interface DateInputBaseProps extends Partial<DatePickerProps> {
	renderInput?: DatePickerProps['renderInput'];
}

const DateInputBase = (props: DateInputBaseProps) => {
	const {
		value,
		onChange,
		...rest
	} = props;

	return (
		<LocalizationProvider dateAdapter={AdapterLuxon}>
			<DatePicker
				value={value}
				onChange={onChange}
				renderInput={(params) => <Input {...params} />}
				{...rest}
			/>
		</LocalizationProvider>
	);
};

export default DateInputBase;
