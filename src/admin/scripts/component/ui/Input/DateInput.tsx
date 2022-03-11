import React from 'react';

import DateInputBase, { DateInputBaseProps } from './DateInput.Base';

export interface DateInputProps extends DateInputBaseProps {}

const DateInput = (props: DateInputProps) => {
	const {
		...rest
	} = props;

	return (
		<DateInputBase
			{...rest}
		/>
	);
};

export default DateInput;
