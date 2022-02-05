import React from 'react';

import CheckboxBase, { CheckboxBaseProps } from './Checkbox.Base';

export interface CheckboxProps {}

const Checkbox = (props: CheckboxProps & CheckboxBaseProps) => {
	const {
		...rest
	} = props;

	return (
		<CheckboxBase
			{...rest}
		/>
	);
};

export default Checkbox;