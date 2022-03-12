import React from 'react';
import { useTranslation } from 'react-i18next';
import AdapterLuxon from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker, { DatePickerProps } from '@mui/lab/DatePicker';

import getLocaleObject from '../../../utils/getLocaleObject';
import Input from './Input';

export interface DateInputBaseProps extends Partial<DatePickerProps> {}

const DateInputBase = (props: DateInputBaseProps) => {
	const {
		value,
		onChange,
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
				renderInput={(params) => <Input {...params} />}
				inputFormat={format}
				{...rest}
			/>
		</LocalizationProvider>
	);
};

export default DateInputBase;
