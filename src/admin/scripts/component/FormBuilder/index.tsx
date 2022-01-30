import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { formMetaItemProps } from './types';
import { Section, Form, Input } from '../ui';

export interface FormBuilderProps {
	metaData: formMetaItemProps[];
	metaDataSidebar?: formMetaItemProps[];
	metaDataLanguage?: formMetaItemProps[];
	formName: string;
	rowLayout?: 'column' | 'row';
	onChange?: (data: any) => void;
	onSubmit?: (data: any) => void;
	dataId?: string;
}

const FormBuilder = (props: FormBuilderProps) => {
	const {
		metaData = [],
		metaDataSidebar = [],
		formName,
		rowLayout = 'column',
		onChange,
		onSubmit,
		dataId = 'form-builder',
	} = props;
	const {
		control,
		register,
		handleSubmit,
		watch,
		formState: {
			isDirty,
			isValid,
			errors,
		},
	} = useForm({
		mode: 'all',
	});

	const changeHandler = (data: any) => {
		console.log('changeHandler', data);
		if (onChange) onChange(data);
	};
	const submitHandler = (data: any) => {
		console.log('submitHandler', data);
		if (onSubmit) onSubmit(data);
	};

	useEffect(() => {
		console.log('errors', errors)
	}, [errors]);

	return (
		<>
			<div>
				<Form.Wrapper
					name={formName}
					onChange={handleSubmit(changeHandler)}
					onSubmit={handleSubmit(submitHandler)}
					dataId={dataId}
					noValidate
					autoComplete="off"
				>
					<Section.Default>
						{metaData.map((field) => {
							console.log('meta field', field);

							if (field.type !== 'hidden') {
								return (
									<div key={field.key}>
										<Controller
											name={field.name}
											control={control}
											rules={{ required: field.inputProps.required }}
											defaultValue={field.inputProps.value}
											render={({ field: {
												onChange,
												onBlur,
												value,
												ref,
												name
											} }) => (
												<Form.Row
													required={field.inputProps.required}
													label={field.inputProps.label}
													id={field.inputProps.id}
													helpTexts={field.helpTexts}
												>
													<>
														{
															{
																'text': (
																	<Input.Text
																		type="text"
																		id={field.inputProps.id}
																		label={field.inputProps.label}
																		placeholder={field.inputProps.placeholder}
																		required={field.inputProps.required}
																		name={name}
																		value={value}
																		onChange={onChange}
																		onBlur={onBlur}
																	/>
																),
																'email': (
																	<Input.Text
																		type="email"
																		id={field.inputProps.id}
																		label={field.inputProps.label}
																		placeholder={field.inputProps.placeholder}
																		required={field.inputProps.required}
																		name={name}
																		value={value}
																		onChange={onChange}
																		onBlur={onBlur}
																	/>
																),
																'number': (
																	<Input.Text
																		type="number"
																		id={field.inputProps.id}
																		label={field.inputProps.label}
																		placeholder={field.inputProps.placeholder}
																		required={field.inputProps.required}
																		name={name}
																		value={value}
																		onChange={onChange}
																		onBlur={onBlur}
																	/>
																),
																'datetime': (
																	<Input.Text
																		type="datetime-local"
																		id={field.inputProps.id}
																		label={field.inputProps.label}
																		placeholder={field.inputProps.placeholder}
																		required={field.inputProps.required}
																		name={name}
																		value={value}
																		onChange={onChange}
																		onBlur={onBlur}
																	/>
																),
																'password': (
																	<Input.Text
																		type="password"
																		id={field.inputProps.id}
																		label={field.inputProps.label}
																		placeholder={field.inputProps.placeholder}
																		required={field.inputProps.required}
																		name={name}
																		value={value}
																		onChange={onChange}
																		onBlur={onBlur}
																	/>
																),
																'textarea': (
																	<Input.Text
																		id={field.inputProps.id}
																		label={field.inputProps.label}
																		placeholder={field.inputProps.placeholder}
																		required={field.inputProps.required}
																		name={name}
																		value={value}
																		onChange={onChange}
																		onBlur={onBlur}
																		multiline
																		rows={field.inputProps.rows || 4}
																	/>
																),


																'select': (
																	<Input.Text
																		id={field.inputProps.id}
																		label={field.inputProps.label}
																		name={name}
																		value={value}
																		onChange={onChange}
																		onBlur={onBlur}
																	/>
																),


																'radio': (
																	<Input.Text
																		id={field.inputProps.id}
																		label={field.inputProps.label}
																		name={name}
																		value={value}
																		onChange={onChange}
																		onBlur={onBlur}
																	/>
																),
																'checkbox': (
																	<Input.Text
																		id={field.inputProps.id}
																		label={field.inputProps.label}
																		name={name}
																		value={value}
																		onChange={onChange}
																		onBlur={onBlur}
																	/>
																),
																'switch': (
																	<Input.Text
																		id={field.inputProps.id}
																		label={field.inputProps.label}
																		name={name}
																		value={value}
																		onChange={onChange}
																		onBlur={onBlur}
																	/>
																),
																'toggle': (
																	<Input.Text
																		id={field.inputProps.id}
																		label={field.inputProps.label}
																		name={name}
																		value={value}
																		onChange={onChange}
																		onBlur={onBlur}
																	/>
																),
															}[field.type]
														}
													</>
												</Form.Row>
											)}
										/>
									</div>
								);
							} else {
								return (
									<input
										type="hidden"
										key={field.key}
										{...register(field.name, { required: field.inputProps.required })}
									/>
								);
							}
						})}
					</Section.Default>
					{/* in case of sidebar => redefine columns !!! */}
				</Form.Wrapper>
			</div>
		</>
	);
};

export default FormBuilder;