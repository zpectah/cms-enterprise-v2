import React, { useEffect, useState } from 'react';
import { useForm, UseFormReturn, UseFormProps } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert, Typography } from '@mui/material';

import { string } from '../../../../../../utils/helpers';
import { Section } from '../Section';
import { FormActions, FormBody } from './detailFormLayoutElements';
import { getTestDataAttr } from '../../../utils';

export interface ControlledFormRenderProps {
	token: string;
	form: UseFormReturn;
	setExternalError: (error: boolean) => void;
	externalError: boolean;
}
export interface ControlledFormProps extends UseFormProps {
	dataId?: string;
	errorMessage?: string;
	formProps?: React.HTMLProps<HTMLFormElement>;
	renderMain: (form: ControlledFormRenderProps) => React.ReactNode;
	renderActions?: (form: ControlledFormRenderProps) => React.ReactNode;
	onSubmit?: (data: any, e: any) => void;
	onError?: (fields: any) => void;
	onChange?: (fields: any) => void;
	mandatoryInfo?: boolean;
	onTrigger?: (name: string | string[] | readonly string[]) => Promise<{ name: string | string[] | readonly string[] }>;
	disableActionsOffset?: boolean;
}

const ControlledForm = (props: ControlledFormProps) => {
	const { t } = useTranslation([ 'messages', 'form' ]);

	const {
		dataId = 'controlled-form',
		errorMessage = t('messages:form.error_global'),
		formProps,
		renderMain,
		renderActions,
		onSubmit,
		onError,
		onChange,
		mode = 'all',
		mandatoryInfo,
		onTrigger,
		disableActionsOffset,
		...rest
	} = props;

	const [ externalError, setExternalError ] = useState(false);

	const uid = dataId ? dataId : string.getToken(3, '');
	const form: ControlledFormRenderProps = {
		token: uid,
		form: useForm({
			mode,
			...rest,
		}),
		setExternalError: (error: boolean) => setExternalError(error),
		externalError,
	};

	const errorHandler = (fields: any) => {
		if (onError) onError(fields);
	};
	const changeHandler = () => {
		if (onChange) onChange(form.form.watch());
	};

	return (
		<form
			noValidate
			autoComplete="off"
			name={dataId}
			style={{ width: '100%' }}
			onSubmit={form.form.handleSubmit(onSubmit,  errorHandler)}
			onChange={changeHandler}
			{...formProps}
			{...getTestDataAttr(dataId)}
		>
			<>
				{renderMain(form)}
			</>
			{mandatoryInfo && (
				<FormBody>
					<Typography variant="caption">
						{t('form:mandatoryInfo')}
					</Typography>
				</FormBody>
			)}
			{(form.form.formState.errors
				&& form.form.formState.isSubmitted
				&& !form.form.formState.isSubmitSuccessful
				&& errorMessage
			) && (
				<Section
					noSpacing
					style={{
						paddingBottom: disableActionsOffset ? '2rem' : 'inherit',
					}}
				>
					<Alert
						severity="error"
					>
						{errorMessage}
					</Alert>
				</Section>
			)}
			{renderActions && (
				<FormActions
					style={{
						paddingTop: disableActionsOffset ? 0 : '2.5rem',
					}}
				>
					{renderActions(form)}
				</FormActions>
			)}
		</form>
	);
};

export default ControlledForm;
