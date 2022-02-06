import React from 'react';

import getTestDataAttr from '../../../utils/getTestDataAttr';

export interface FormBaseProps extends React.HTMLProps<HTMLFormElement>, React.HTMLAttributes<HTMLFormElement> {
	dataId?: string;
}

const FormBase: React.FC<FormBaseProps> = (props) => {
	const {
		children,
		dataId = 'form-base',
		onChange,
		onSubmit,
		...rest
	} = props;

	const changeHandler = (e: React.FormEvent<HTMLFormElement>) => {
		if (onChange) onChange(e);
	};
	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		if (onSubmit) onSubmit(e);
	};

	return (
		<form
			noValidate
			autoComplete="off"
			onChange={changeHandler}
			onSubmit={submitHandler}
			{...rest}
			{...getTestDataAttr(dataId)}
		>
			{children}
		</form>
	);
};

export default FormBase;