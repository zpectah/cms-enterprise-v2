import React, { useState } from 'react';
import { Stack } from '@mui/material';
import { useForm, UseFormReturn, UseFormProps } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
	Alert,
	Divider,
	Typography,
} from '@mui/material';

import { string } from '../../../../../../utils/helpers';
import { Section } from '../Section';
import {
	DeleteButton,
	PrimaryButton,
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
import { getTestDataAttr } from '../../../utils';
import { FieldValues } from 'react-hook-form/dist/types/fields';

export interface ControlledDetailFormLayoutRenderProps {
	token: string;
	form: UseFormReturn;
	setExternalError: (error: boolean) => void;
	externalError: boolean;
}
export interface ControlledDetailFormLayoutLanguageRenderProps extends ControlledDetailFormLayoutRenderProps {
	lang: string;
	languageList: string[];
	changeLanguage?: (lang: string) => void;
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
	mandatoryInfo?: boolean;
	viewable?: boolean;
	editable?: boolean;
	submitting?: boolean;
	actions?: {
		update: boolean,
		create: boolean,
		delete: boolean,
	};
}

const ControlledDetailFormLayout = (props: ControlledDetailFormLayoutProps) => {
	const { t } = useTranslation([ 'common', 'messages', 'form' ]);

	const {
		dataId = 'controlled-detail-form-layout',
		errorMessage = t('messages:form.error_global'),
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
		mandatoryInfo,
		viewable = true,
		editable = true,
		submitting,
		actions,
		...rest
	} = props;

	const [ externalError, setExternalError ] = useState(false);

	const token = dataId ? dataId : string.getToken(3, '');
	const form: ControlledDetailFormLayoutRenderProps = {
		token,
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
	const deleteHandler = () => {
		if (onDelete) onDelete();
	};

	return (
		<FormOuter
			{...getTestDataAttr(dataId)}
		>
			{viewable ? (
				<>
					<form
						noValidate
						autoComplete="off"
						name={dataId}
						style={{ width: '100%' }}
						onSubmit={form.form.handleSubmit(onSubmit,  errorHandler)}
						{...formProps}
					>
						<FormInner>
							<FormBody>
								<FormContent>
									{renderPrimary && (
										<Section noSpacing>
											{renderPrimary(form)}
										</Section>
									)}
									{renderLanguage && (
										<Section noSpacing>
											<LanguageFieldset
												render={(
													lang,
													languageList,
													changeLanguage,
												) => renderLanguage({
													lang,
													languageList,
													changeLanguage,
													...form,
												})}
											/>
											{!!renderSecondary && (
												<Divider
													sx={{
														marginBottom: '2rem',
													}}
												/>
											)}
										</Section>
									)}
									{renderSecondary && (
										<Section noSpacing>
											{renderSecondary(form)}
										</Section>
									)}
								</FormContent>
								<FormSidebar children={renderSidebar(form)} />
							</FormBody>
							{mandatoryInfo && (
								<FormBody>
									<Typography variant="caption">
										{t('form:mandatoryInfo')}
									</Typography>
								</FormBody>
							)}
							<Section noSpacing>
								{(!actions.create && detailId === 'new') && (
									<Alert
										severity="warning"
										sx={{ mt: 2 }}
									>
										{t('messages:profile.user_noPermission_create')}
									</Alert>
								)}
								{(!actions.update && detailId !== 'new') && (
									<Alert
										severity="warning"
										sx={{ mt: 2 }}
									>
										{t('messages:profile.user_noPermission_update')}
									</Alert>
								)}
								{(!actions.delete && detailId !== 'new') && (
									<Alert
										severity="warning"
										sx={{ mt: 2 }}
									>
										{t('messages:profile.user_noPermission_delete')}
									</Alert>
								)}
								{(form.form.formState.errors
									&& form.form.formState.isSubmitted
									&& !form.form.formState.isSubmitSuccessful
									&& errorMessage
								) && (
									<Alert
										severity="error"
									>
										{errorMessage}
									</Alert>
								)}
							</Section>
							<FormActions children={
								<Stack
									direction="row"
									spacing={2}
								>
									{renderActions ? renderActions(form) : (
										<>
											{detailId === 'new' ? (
												<PrimaryButton
													type="submit"
													disabled={!form.form.formState.isValid || externalError || !actions.create || !editable}
													loading={submitting}
												>
													{t('btn.create')}
												</PrimaryButton>
											) : (
												<PrimaryButton
													type="submit"
													disabled={!form.form.formState.isValid || externalError || !actions.update || !editable}
													loading={submitting}
												>
													{t('btn.update')}
												</PrimaryButton>
											)}
											{detailId !== 'new' && (
												<DeleteButton
													onClick={deleteHandler}
													disabled={!actions.delete || submitting || !editable}
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
				</>
			) : (
				<Alert
					severity="error"
				>
					{t('messages:form.not_allowed_to_view')}
				</Alert>
			)}
		</FormOuter>
	);
};

export default ControlledDetailFormLayout;
