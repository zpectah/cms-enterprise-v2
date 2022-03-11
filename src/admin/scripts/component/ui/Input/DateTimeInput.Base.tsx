import React from 'react';
import AdapterLuxon from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker, { DateTimePickerProps } from '@mui/lab/DateTimePicker';

import Input from './Input';

export interface DateTimeInputBaseProps extends Partial<DateTimePickerProps> {
	renderInput?: DateTimePickerProps['renderInput'];
}

const DateTimeInputBase = (props: DateTimeInputBaseProps) => {
	const {
		value,
		onChange,
		...rest
	} = props;

	return (
		<LocalizationProvider dateAdapter={AdapterLuxon}>
			<DateTimePicker
				value={value}
				onChange={onChange}
				renderInput={(params) => <Input {...params} />}
				{...rest}
			/>
		</LocalizationProvider>
	);
};

export default DateTimeInputBase;
