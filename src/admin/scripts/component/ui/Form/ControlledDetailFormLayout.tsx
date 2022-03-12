import React from 'react';
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
import getTestDataAttr from '../../../utils/getTestDataAttr';
import { FieldValues } from 'react-hook-form/dist/types/fields';

export interface ControlledDetailFormLayoutRenderProps {
	token: string;
	form: UseFormReturn;
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
		...rest
	} = props;

	const token = dataId ? dataId : string.getToken(3, '');
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
				name={dataId}
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
					{(form.form.formState.errors
						&& form.form.formState.isSubmitted
						&& !form.form.formState.isSubmitSuccessful
						&& errorMessage
					) && (
						<Section noSpacing>
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
									<PrimaryButton
										type="submit"
										disabled={!form.form.formState.isValid}
									>
										{detailId === 'new' ? t('btn.create') : t('btn.update')}
									</PrimaryButton>
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
