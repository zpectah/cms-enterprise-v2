import React from 'react';

import DateTimeInputBase, { DateTimeInputBaseProps } from './DateTimeInput.Base';

export interface DateTimeInputProps extends DateTimeInputBaseProps {}

const DateTimeInput = (props: DateTimeInputProps) => {
	const {
		...rest
	} = props;

	return (
		<DateTimeInputBase
			{...rest}
		/>
	);
};

export default DateTimeInput;
