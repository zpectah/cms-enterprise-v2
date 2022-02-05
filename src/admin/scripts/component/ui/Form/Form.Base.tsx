import React, { createContext } from 'react';
import { useForm, UseFormProps } from 'react-hook-form';

import getTestDataAttr from '../../../utils/getTestDataAttr';

export interface FormBaseProps extends React.HTMLProps<HTMLFormElement>, React.HTMLAttributes<HTMLFormElement> {
	dataId?: string;
	onChange?: (data: unknown) => void;
	onSubmit?: (data: unknown) => void;
	useFormProps?: UseFormProps;
}
export interface FormProviderProps {
	control: any;
	register: any;
	watch: any;
	formState: any;
}
export interface FormConsumerProps {
	children: (form: FormProviderProps) => React.ReactNode;
}

const FormContext = createContext({
	control: () => null,
	register: () => null,
	watch: () => null,
	formState: {},
} as FormProviderProps);

const FormBase: React.FC<FormBaseProps> = (props) => {
	const {
		children,
		dataId = 'form-base',
		onChange,
		onSubmit,
		useFormProps = {
			mode: 'all',
		},
		...rest
	} = props;

	const {
		control,
		register,
		handleSubmit,
		watch,
		formState,
	} = useForm(useFormProps);

	const changeHandler = (data: unknown) => {
		if (onChange) onChange(data);
	};
	const submitHandler = (data: unknown) => {
		if (onSubmit) onSubmit(data);
	};

	return (
		<FormContext.Provider value={{
			control,
			register,
			watch,
			formState,
		} as FormProviderProps}>
			<form
				noValidate
				autoComplete="off"
				onChange={handleSubmit(changeHandler)}
				onSubmit={handleSubmit(submitHandler)}
				{...rest}
				{...getTestDataAttr(dataId)}
			>
				{children}
			</form>
		</FormContext.Provider>
	);
};

export const FormConsumer: React.FC<FormConsumerProps> = (props) => {
	const {
		children,
		...rest
	} = props;

	return <FormContext.Consumer children={children} {...rest} />;
};

export default FormBase;