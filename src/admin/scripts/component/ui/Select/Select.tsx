import React from 'react';

import SelectBase, { SelectBaseProps } from './Select.Base';

export interface SelectProps extends SelectBaseProps {}

const Select = (props: SelectProps) => {
	const {
		...rest
	} = props;

	return (
		<SelectBase
			{...rest}
		/>
	);
};

export default Select;