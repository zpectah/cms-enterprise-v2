import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { Alert } from '@mui/material';

import { settingsProps } from '../../types/app';
import {
	Form,
	Tabs,
	TabPanel,
	Section,
	ControlledFormRow,
	Input,
	Textarea,
	SubmitButton,
	LoadingBar,
	BlockPreloader, SwitchControlled,
} from '../../component/ui';
import { EMAIL_REGEX } from '../../constants';
import routes from '../../routes';

interface SettingsFormProps {
	data: settingsProps;
	onSubmit: (data: settingsProps) => Promise<unknown>;
	loading: boolean;
}

const SettingsForm = (props: SettingsFormProps) => {
	const {
		data,
		onSubmit,
		loading,
	} = props;

	const { t } = useTranslation([ 'components' ]);
	const params = useParams();
	const navigate = useNavigate();
	const [ panelValue, setPanelValue ] = useState<number>(0);

	const {
		control,
		register,
		handleSubmit,
		formState: {
			isDirty,
			isValid,
			errors,
		},
	} = useForm({
		mode: 'all',
		defaultValues: data,
	});

	const panelOptions = [
		{
			index: 0,
			key: 'global',
			label: t('components:SettingsForm.panel.global'),
		},
		{
			index: 1,
			key: 'web',
			label: t('components:SettingsForm.panel.web'),
		},
		{
			index: 2,
			key: 'content',
			label: t('components:SettingsForm.panel.content'),
		},
		{
			index: 3,
			key: 'maintenance',
			label: t('components:SettingsForm.panel.maintenance'),
		},
	];

	const panelChangeHandler = (e, value: number) => navigate(`/admin/app/${routes.settings.path}/${panelOptions[value].key}`);

	const submitHandler = (data: any) => {
		const master = _.cloneDeep(data);
		console.log('submitHandler', master);
		onSubmit(master).then((resp) => {
			console.info('After submit', master, resp);
		});
	};

	const formMetaProps = {
		name: 'UsersDetailForm',
		onSubmit: handleSubmit(submitHandler),
		errors: errors && t('components:SettingsForm.error_global'),
		actionsNode: (
			<SubmitButton
				disabled={(isDirty && !isValid)}
			/>
		),
	};

	useEffect(() => {
		if (params['*']) {
			panelOptions.map((panel) => {
				if (params['*'] === panel.key) setPanelValue(panel.index);
			});
		} else {
			navigate(`/admin/app/${routes.settings.path}/${panelOptions[0].key}`);
		}
	}, [ params ]);

	return (
		<>
			{loading && <LoadingBar />}
			{data ? (
				<Form {...formMetaProps}>
					<Tabs
						labels={[
							panelOptions[0].label,
							panelOptions[1].label,
							panelOptions[2].label,
							panelOptions[3].label,
						]}
						activeValue={panelValue}
						onChange={panelChangeHandler}
					>
						<TabPanel
							index={panelOptions[0].index}
							panelValue={panelValue}
						>
							<>
								{/*
						// project_name?: string;
						// project_description?: string;
						// company_name?: string;
						// company_description?: string;
						// company_id?: string;
						// company_address?: string;
						// company_city?: string;
						// company_country?: string;
						// company_zip?: string;
						// company_location?: [number, number];
						// company_email?: string[];
						// company_phone?: number[];
						// company_bank?: string;
						*/}
								<Section
									title={t('components:SettingsForm.section.project')}
								>

									<ControlledFormRow
										name="project_name"
										control={control}
										rules={{ required: true }}
										defaultValue={data.project_name}
										rowProps={{
											label: t('components:SettingsForm.label.project_name'),
											id: `${formMetaProps.name}_project_name`,
											required: true,
										}}
										render={({ field, fieldState }) => {
											const { ref, ...rest } = field;
											const { error } = fieldState;

											return (
												<Input
													placeholder={t('components:SettingsForm.placeholder.project_name')}
													id={`${formMetaProps.name}_project_name`}
													error={!!error}
													required
													inputRef={ref}
													{...rest}
												/>
											);
										}}
									/>

									<ControlledFormRow
										name="project_description"
										control={control}
										rules={{}}
										defaultValue={data.project_description}
										rowProps={{
											label: t('components:SettingsForm.label.project_description'),
											id: `${formMetaProps.name}_project_description`,
											helpTexts: [ t('components:SettingsForm.help.project_description') ],
										}}
										render={({ field, fieldState }) => {
											const { ref, ...rest } = field;
											const { error } = fieldState;

											return (
												<Textarea
													placeholder={t('components:SettingsForm.placeholder.project_description')}
													id={`${formMetaProps.name}_project_description`}
													error={!!error}
													inputRef={ref}
													{...rest}
												/>
											);
										}}
									/>

								</Section>
								<Section
									title={t('components:SettingsForm.section.company')}
								>

									<ControlledFormRow
										name="company_name"
										control={control}
										rules={{}}
										defaultValue={data.company_name}
										rowProps={{
											label: t('components:SettingsForm.label.company_name'),
											id: `${formMetaProps.name}_company_name`,
										}}
										render={({ field, fieldState }) => {
											const { ref, ...rest } = field;
											const { error } = fieldState;

											return (
												<Input
													placeholder={t('components:SettingsForm.placeholder.company_name')}
													id={`${formMetaProps.name}_company_name`}
													error={!!error}
													inputRef={ref}
													{...rest}
												/>
											);
										}}
									/>

									<ControlledFormRow
										name="company_description"
										control={control}
										rules={{}}
										defaultValue={data.company_description}
										rowProps={{
											label: t('components:SettingsForm.label.company_description'),
											id: `${formMetaProps.name}_company_description`,
										}}
										render={({ field, fieldState }) => {
											const { ref, ...rest } = field;
											const { error } = fieldState;

											return (
												<Textarea
													placeholder={t('components:SettingsForm.placeholder.company_description')}
													id={`${formMetaProps.name}_company_description`}
													error={!!error}
													inputRef={ref}
													{...rest}
												/>
											);
										}}
									/>

									<ControlledFormRow
										name="company_id"
										control={control}
										rules={{}}
										defaultValue={data.company_id}
										rowProps={{
											label: t('components:SettingsForm.label.company_id'),
											id: `${formMetaProps.name}_company_id`,
										}}
										render={({ field, fieldState }) => {
											const { ref, ...rest } = field;
											const { error } = fieldState;

											return (
												<Input
													placeholder={t('components:SettingsForm.placeholder.company_id')}
													id={`${formMetaProps.name}_company_id`}
													error={!!error}
													inputRef={ref}
													style={{ width: '50%' }}
													{...rest}
												/>
											);
										}}
									/>

								</Section>
							</>
						</TabPanel>
						<TabPanel
							index={panelOptions[1].index}
							panelValue={panelValue}
						>
							<>
								{/*
						// web_meta_title?: string;
						// web_meta_description?: string;
						// web_meta_keywords?: string[];
						// web_meta_robots?: string;
						// web_mode_debug?: boolean;
						// web_mode_maintenance?: boolean;
						// members_login_active?: boolean;
						// members_lostPassword_active?: boolean;
						// members_profile_active?: boolean;
						// members_register_active?: boolean;
						*/}
								<Section>

									... web content ...

									<ControlledFormRow
										name="web_mode_debug"
										control={control}
										rules={{}}
										defaultValue={data.web_mode_debug}
										render={({ field }) => {
											const { ref, value, ...rest } = field;

											return (
												<SwitchControlled
													id={`${formMetaProps.name}_active`}
													label={t('form:label.active')}
													checked={value}
													inputRef={ref}
													{...rest}
												/>
											);
										}}
									/>

								</Section>
							</>
						</TabPanel>
						<TabPanel
							index={panelOptions[2].index}
							panelValue={panelValue}
						>
							<>
								{/*
						// comments_anonymous_active?: boolean;
						// comments_global_active?: boolean;
						// language_active?: string[];
						// language_default?: string;
						// language_installed?: string[];
						// form_email_recipients?: string[];
						// form_email_sender?: string;
						*/}
								<Section>

									... content content ...

								</Section>
							</>
						</TabPanel>
						<TabPanel
							index={panelOptions[3].index}
							panelValue={panelValue}
						>
							<>
								{/*
						Dynamic triggers ...
						*/}
								<Section>

									... maintenance content ...

								</Section>
							</>
						</TabPanel>
					</Tabs>
				</Form>
			) : (
				<BlockPreloader />
			)}
		</>
	);
};

export default SettingsForm;
