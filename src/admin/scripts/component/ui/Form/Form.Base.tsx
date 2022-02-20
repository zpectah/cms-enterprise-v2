import React from 'react';

import getTestDataAttr from '../../../utils/getTestDataAttr';

export interface FormBaseProps extends React.HTMLProps<HTMLFormElement>, React.HTMLAttributes<HTMLFormElement> {
	dataId?: string;
}

const FormBase: React.FC<FormBaseProps> = (props) => {
	const {
		children,
		dataId = 'form-base',
		style = {
			width: '100%',
		},
		...rest
	} = props;

	return (
		<form
			noValidate
			autoComplete="off"
			style={style}
			{...rest}
			{...getTestDataAttr(dataId)}
		>
			{children}
		</form>
	);
};

export default FormBase;