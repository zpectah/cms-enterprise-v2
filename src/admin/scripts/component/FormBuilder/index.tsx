import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import { formMetaItemProps } from './types';
import { Section, Form } from '../ui';

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
		// defaultValues: {},
	});

	const changeHandler = (data: any) => {
		console.log('changeHandler', data);
		if (onChange) onChange(data);
	};
	const submitHandler = (data: any) => {
		console.log('submitHandler', data);
		if (onSubmit) onSubmit(data);
	};

	return (
		<>
			<div>
				<Form.Wrapper
					name={formName}
					onChange={handleSubmit(changeHandler)}
					onSubmit={handleSubmit(submitHandler)}
					dataId={dataId}
				>
					<Section.Default>
						{metaData.map((field) => {
							console.log('meta field', field);

							return (
								<Form.Row
									key={field.key}
									required={field.inputProps.required}
									label={field.inputProps.label}
									id={field.inputProps.id}
									helpTexts={field.helpTexts}
								>
									<Controller
										name={field.name}
										control={control}
										rules={{ required: field.inputProps.required }}
										render={({ field: {
											onChange,
											onBlur,
											value,
											ref,
											name
										} }) => (
											<>
												field: {JSON.stringify(field.inputProps)}
											</>
										)}
									/>
								</Form.Row>
							);
						})}
					</Section.Default>
					{/* in case of sidebar => redefine columns !!! */}
				</Form.Wrapper>
			</div>
		</>
	);
};

export default FormBuilder;