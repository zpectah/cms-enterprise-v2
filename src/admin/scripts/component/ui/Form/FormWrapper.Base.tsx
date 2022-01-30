import React from 'react';

import getTestDataAttr from '../../../utils/getTestDataAttr';

interface FormWrapperBaseProps extends React.HTMLProps<HTMLFormElement>, React.HTMLAttributes<HTMLFormElement> {
	dataId?: string;
}

const FormWrapperBase: React.FC<FormWrapperBaseProps> = (props) => {
	const {
		children,
		dataId = 'form-wrapper',
		...rest
	} = props;

	return (
		<form
			{...rest}
			{...getTestDataAttr(dataId)}
		>
			{children}
		</form>
	);
};

export default FormWrapperBase;