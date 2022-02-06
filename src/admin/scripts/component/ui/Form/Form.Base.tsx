import React from 'react';

import getTestDataAttr from '../../../utils/getTestDataAttr';

export interface FormBaseProps extends React.HTMLProps<HTMLFormElement>, React.HTMLAttributes<HTMLFormElement> {
	dataId?: string;
	onChange?: (data: unknown) => void;
	onSubmit?: (data: unknown) => void;
}

const FormBase: React.FC<FormBaseProps> = (props) => {
	const {
		children,
		dataId = 'form-base',
		onChange,
		onSubmit,
		...rest
	} = props;

	const changeHandler = (data: unknown) => {
		if (onChange) onChange(data);
	};
	const submitHandler = (data: unknown) => {
		if (onSubmit) onSubmit(data);
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