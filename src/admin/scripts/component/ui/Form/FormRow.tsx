import React from 'react';

import FormRowBase, { FormRowBaseProps } from './FormRow.Base';

export interface FormRowProps extends FormRowBaseProps {}

const FormRow: React.FC<FormRowProps> = (props) => {
	const {
		...rest
	} = props;

	return (
		<FormRowBase
			{...rest}
		/>
	);
};

export default FormRow;
