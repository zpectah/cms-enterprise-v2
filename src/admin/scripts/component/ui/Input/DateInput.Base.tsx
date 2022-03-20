import React from 'react';
import { useTranslation } from 'react-i18next';
import AdapterLuxon from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker, { DatePickerProps } from '@mui/lab/DatePicker';

import { getLocaleObject } from '../../../utils';
import Input from './Input';

export interface DateInputBaseProps extends Partial<DatePickerProps> {
	required?: boolean;
}

const DateInputBase = (props: DateInputBaseProps) => {
	const {
		value,
		onChange,
		required,
		InputProps,
		...rest
	} = props;

	const { i18n } = useTranslation();

	const language = i18n.language;
	const format = getLocaleObject(language).format.date;

	return (
		<LocalizationProvider dateAdapter={AdapterLuxon}>
			<DatePicker
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

export default DateInputBase;
