import React, { FormEvent } from 'react';
import { useForm, UseFormReturn, UseFormProps } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert } from '@mui/material';

import { string } from '../../../../../../utils/helpers';
import { Section } from '../Section';
import { FormActions } from './detailFormLayoutElements';
import getTestDataAttr from '../../../utils/getTestDataAttr';

export interface ControlledFormRenderProps {
	token: string;
	form: UseFormReturn;
}
export interface ControlledFormProps extends UseFormProps {
	dataId?: string;
	errorMessage?: string;
	token?: string;
	formProps?: React.HTMLProps<HTMLFormElement>;
	renderMain: (form: ControlledFormRenderProps) => React.ReactNode;
	renderActions?: (form: ControlledFormRenderProps) => React.ReactNode;
	onSubmit?: (data: any, e: any) => void;
	onError?: (fields: any) => void;
}

const ControlledForm = (props: ControlledFormProps) => {
	const { t } = useTranslation([ 'messages' ]);

	const {
		dataId = 'controlled-form',
		errorMessage = t('messages:form.error_global'),
		token,
		formProps,
		renderMain,
		renderActions,
		onSubmit,
		onError,
		mode = 'all',
		...rest
	} = props;

	const form: ControlledFormRenderProps = {
		token: token ? token : string.getToken(4, ''),
		form: useForm({
			mode,
			...rest,
		}),
	};

	const errorHandler = (fields: any) => {
		if (onError) onError(fields);
	};

	return (
		<form
			noValidate
			autoComplete="off"
			name={dataId}
			style={{
				width: '100%',
			}}
			onSubmit={form.form.handleSubmit(onSubmit,  errorHandler)}
			{...formProps}
			{...getTestDataAttr(`${dataId}_${form.token}`)}
		>
			<>
				{renderMain(form)}
			</>
			{(form.form.formState.errors && form.form.formState.isSubmitted && errorMessage) && (
				<Section>
					<Alert
						severity="error"
					>
						{errorMessage}
					</Alert>
				</Section>
			)}
			{renderActions && (
				<FormActions>
					{renderActions(form)}
				</FormActions>
			)}
		</form>
	);
};

export default ControlledForm;
