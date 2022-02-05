import React from 'react';

import SelectBase, { SelectBaseProps } from './Select.Base';

interface SelectProps {}

const Select = (props: SelectProps & SelectBaseProps) => {
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