import React from 'react';
import { useTranslation } from 'react-i18next';
import AdapterLuxon from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker, { DateTimePickerProps } from '@mui/lab/DateTimePicker';

import { getLocaleObject } from '../../../utils';
import Input from './Input';

export interface DateTimeInputBaseProps extends Partial<DateTimePickerProps> {
	required?: boolean;
}

const DateTimeInputBase = (props: DateTimeInputBaseProps) => {
	const {
		value,
		onChange,
		required,
		InputProps,
		...rest
	} = props;

	const { i18n } = useTranslation();

	const language = i18n.language;
	const format = getLocaleObject(language).format.datetime;

	return (
		<LocalizationProvider dateAdapter={AdapterLuxon}>
			<DateTimePicker
				value={value}
				onChange={onChange}
				renderInput={(params) => <Input required={required} {...params} />}
				inputFormat={format}
				InputProps={InputProps}
				{...rest}
			/>
		</LocalizationProvider>
	);
};

export default DateTimeInputBase;
