import React from 'react';
import { Stack } from '@mui/material';
import { useForm, UseFormReturn, UseFormProps } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert } from '@mui/material';

import { string } from '../../../../../../utils/helpers';
import { Section } from '../Section';
import {
	SubmitButton,
	DeleteButton,
} from '../Button';
import LanguageFieldset from './LanguageFieldset';
import {
	FormOuter,
	FormInner,
	FormBody,
	FormContent,
	FormSidebar,
	FormActions,
	FormAddons,
} from './detailFormLayoutElements';
import getTestDataAttr from '../../../utils/getTestDataAttr';
import { FieldValues } from 'react-hook-form/dist/types/fields';

export interface ControlledDetailFormLayoutRenderProps {
	token: string;
	form: UseFormReturn;
}
export interface ControlledDetailFormLayoutLanguageRenderProps extends ControlledDetailFormLayoutRenderProps {
	lang: string;
}
export interface ControlledDetailFormLayoutProps<TFieldValues extends FieldValues = FieldValues> extends UseFormProps {
	dataId?: string;
	errorMessage?: string;
	renderPrimary?: (form: ControlledDetailFormLayoutRenderProps) => React.ReactNode;
	renderSecondary?: (form: ControlledDetailFormLayoutRenderProps) => React.ReactNode;
	renderLanguage?: (form: ControlledDetailFormLayoutLanguageRenderProps) => React.ReactNode;
	renderSidebar?: (form: ControlledDetailFormLayoutRenderProps) => React.ReactNode;
	renderActions?: (form: ControlledDetailFormLayoutRenderProps) => React.ReactNode;
	renderAddons?: (form: ControlledDetailFormLayoutRenderProps) => React.ReactNode;
	formProps?: React.HTMLProps<HTMLFormElement>;
	onSubmit?: (data: any, e: any) => void;
	onDelete?: () => void;
	onError?: (fields: any) => void;
	detailId: string | number;
}

const ControlledDetailFormLayout = (props: ControlledDetailFormLayoutProps) => {
	const { t } = useTranslation([ 'common' ]);

	const {
		dataId = 'controlled-detail-form-layout',
		errorMessage,
		renderPrimary,
		renderSidebar,
		renderSecondary,
		renderLanguage,
		renderActions,
		renderAddons,
		formProps,
		onSubmit,
		onError,
		onDelete,
		detailId,
		mode = 'all',
		...rest
	} = props;

	const token = dataId ? dataId : string.getToken(4, '');
	const form: ControlledDetailFormLayoutRenderProps = {
		token,
		form: useForm({
			mode,
			...rest,
		}),
	};

	const errorHandler = (fields: any) => {
		if (onError) onError(fields);
	};
	const deleteHandler = () => {
		if (onDelete) onDelete();
	};

	return (
		<FormOuter
			{...getTestDataAttr(dataId)}
		>
			<form
				noValidate
				autoComplete="off"
				style={{
					width: '100%',
				}}
				onSubmit={form.form.handleSubmit(onSubmit,  errorHandler)}
				{...formProps}
			>
				<FormInner>
					<FormBody>
						<FormContent>
							{renderPrimary && (
								<Section>
									{renderPrimary(form)}
								</Section>
							)}
							{renderLanguage && (
								<Section>
									<LanguageFieldset
										render={(lang) => renderLanguage({ lang, ...form })}
									/>
								</Section>
							)}
							{renderSecondary && (
								<Section>
									{renderSecondary(form)}
								</Section>
							)}
						</FormContent>
						<FormSidebar children={renderSidebar(form)} />
					</FormBody>
					{(form.form.formState.errors && errorMessage) && (
						<Section>
							<Alert
								severity="error"
							>
								{errorMessage}
							</Alert>
						</Section>
					)}
					<FormActions children={
						<Stack
							direction="row"
							spacing={2}
						>
							{renderActions ? renderActions(form) : (
								<>
									<SubmitButton
										disabled={(form.form.formState.isDirty && !form.form.formState.isValid)}
									>
										{detailId === 'new' ? t('btn.create') : t('btn.update')}
									</SubmitButton>
									{detailId !== 'new' && (
										<DeleteButton
											onClick={deleteHandler}
										/>
									)}
								</>
							)}
						</Stack>
					} />
				</FormInner>
			</form>
			{renderAddons && (
				<FormAddons children={renderAddons(form)} />
			)}
		</FormOuter>
	);
};

export default ControlledDetailFormLayout;
