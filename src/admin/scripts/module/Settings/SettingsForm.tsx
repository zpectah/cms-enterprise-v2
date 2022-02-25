import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import { settingsProps } from '../../types/app';
import {
	ControlledForm,
	Tabs,
	TabPanel,
	Section,
	ControlledFormRow,
	Input,
	Textarea,
	SubmitButton,
	LoadingBar,
	BlockPreloader,
	SwitchControlled,
	TagPicker,
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

	const panels = [
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
	const panelChangeHandler = (e, value: number) => navigate(`/admin/app/${routes.settings.path}/${panels[value].key}`);

	const submitHandler = (data: any) => {
		const master = _.cloneDeep(data);
		console.log('submitHandler', master);
		onSubmit(master).then((resp) => {
			console.info('After submit', master, resp);
		});
	};

	useEffect(() => {
		if (params['*']) {
			panels.map((panel) => {
				if (params['*'] === panel.key) setPanelValue(panel.index);
			});
		} else {
			navigate(`/admin/app/${routes.settings.path}/${panels[0].key}`);
		}
	}, [ params ]);

	return (
		<>
			{loading && <LoadingBar />}
			{data ? (
				<ControlledForm
					dataId="UsersDetailForm"
					defaultValues={data}
					onSubmit={submitHandler}
					errorMessage={t('components:SettingsForm.error_global')}
					renderMain={(form) => {
						const {
							token,
							form: {
								control,
								formState,
							},
						} = form;

						return (
							<>
								<Tabs
									labels={[
										panels[0].label,
										panels[1].label,
										panels[2].label,
										panels[3].label,
									]}
									activeValue={panelValue}
									onChange={panelChangeHandler}
								>
									<TabPanel
										index={panels[0].index}
										panelValue={panelValue}
									>
										<>
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
														id: `${token}_project_name`,
														required: true,
													}}
													render={({ field, fieldState }) => {
														const { ref, ...rest } = field;
														const { error } = fieldState;

														return (
															<Input
																placeholder={t('components:SettingsForm.placeholder.project_name')}
																id={`${token}_project_name`}
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
														id: `${token}_project_description`,
														helpTexts: [ t('components:SettingsForm.help.project_description') ],
													}}
													render={({ field, fieldState }) => {
														const { ref, ...rest } = field;
														const { error } = fieldState;

														return (
															<Textarea
																placeholder={t('components:SettingsForm.placeholder.project_description')}
																id={`${token}_project_description`}
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
														id: `${token}_company_name`,
													}}
													render={({ field, fieldState }) => {
														const { ref, ...rest } = field;
														const { error } = fieldState;

														return (
															<Input
																placeholder={t('components:SettingsForm.placeholder.company_name')}
																id={`${token}_company_name`}
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
														id: `${token}_company_description`,
													}}
													render={({ field, fieldState }) => {
														const { ref, ...rest } = field;
														const { error } = fieldState;

														return (
															<Textarea
																placeholder={t('components:SettingsForm.placeholder.company_description')}
																id={`${token}_company_description`}
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
														id: `${token}_company_id`,
													}}
													render={({ field, fieldState }) => {
														const { ref, ...rest } = field;
														const { error } = fieldState;

														return (
															<Input
																placeholder={t('components:SettingsForm.placeholder.company_id')}
																id={`${token}_company_id`}
																error={!!error}
																inputRef={ref}
																style={{ width: '50%' }}
																{...rest}
															/>
														);
													}}
												/>
												<ControlledFormRow
													name="company_email"
													control={control}
													rules={{}}
													defaultValue={data.company_email}
													rowProps={{
														label: t('components:SettingsForm.label.company_email'),
														id: `${token}_company_email`,
													}}
													render={({ field }) => {
														const { value, onChange } = field;

														return (
															<TagPicker
																value={value}
																onChange={onChange}
																id={`${token}_company_email`}
																placeholder={t('components:SettingsForm.placeholder.company_email')}
																inputType="email"
															/>
														);
													}}
												/>
												<ControlledFormRow
													name="company_phone"
													control={control}
													rules={{}}
													defaultValue={data.company_phone}
													rowProps={{
														label: t('components:SettingsForm.label.company_phone'),
														id: `${token}_company_phone`,
													}}
													render={({ field, fieldState }) => {
														const { value, onChange } = field;

														return (
															<TagPicker
																value={value}
																onChange={onChange}
																id={`${token}_company_phone`}
																placeholder={t('components:SettingsForm.placeholder.company_phone')}
																inputType="tel"
															/>
														);
													}}
												/>
												<ControlledFormRow
													name="company_address"
													control={control}
													rules={{}}
													defaultValue={data.company_address}
													rowProps={{
														label: t('components:SettingsForm.label.company_address'),
														id: `${token}_company_address`,
													}}
													render={({ field, fieldState }) => {
														const { ref, ...rest } = field;
														const { error } = fieldState;

														return (
															<Input
																placeholder={t('components:SettingsForm.placeholder.company_address')}
																id={`${token}_company_address`}
																error={!!error}
																inputRef={ref}
																{...rest}
															/>
														);
													}}
												/>
												<ControlledFormRow
													name="company_city"
													control={control}
													rules={{}}
													defaultValue={data.company_city}
													rowProps={{
														label: t('components:SettingsForm.label.company_city'),
														id: `${token}_company_city`,
													}}
													render={({ field, fieldState }) => {
														const { ref, ...rest } = field;
														const { error } = fieldState;

														return (
															<Input
																placeholder={t('components:SettingsForm.placeholder.company_city')}
																id={`${token}_company_city`}
																error={!!error}
																inputRef={ref}
																{...rest}
															/>
														);
													}}
												/>
												<ControlledFormRow
													name="company_country"
													control={control}
													rules={{}}
													defaultValue={data.company_country}
													rowProps={{
														label: t('components:SettingsForm.label.company_country'),
														id: `${token}_company_country`,
													}}
													render={({ field, fieldState }) => {
														const { ref, ...rest } = field;
														const { error } = fieldState;

														return (
															<Input
																placeholder={t('components:SettingsForm.placeholder.company_country')}
																id={`${token}_company_country`}
																error={!!error}
																inputRef={ref}
																{...rest}
															/>
														);
													}}
												/>
												<ControlledFormRow
													name="company_zip"
													control={control}
													rules={{}}
													defaultValue={data.company_zip}
													rowProps={{
														label: t('components:SettingsForm.label.company_zip'),
														id: `${token}_company_zip`,
													}}
													render={({ field, fieldState }) => {
														const { ref, ...rest } = field;
														const { error } = fieldState;

														return (
															<Input
																placeholder={t('components:SettingsForm.placeholder.company_zip')}
																id={`${token}_company_zip`}
																error={!!error}
																inputRef={ref}
																{...rest}
															/>
														);
													}}
												/>
												<ControlledFormRow
													name="company_location"
													control={control}
													rules={{}}
													defaultValue={data.company_location}
													rowProps={{
														label: t('components:SettingsForm.label.company_location'),
														id: `${token}_company_location`,
													}}
													render={({ field, fieldState }) => {
														const { ref, ...rest } = field;
														const { error } = fieldState;

														return (
															<Input
																placeholder={t('components:SettingsForm.placeholder.company_location')}
																id={`${token}_company_location`}
																error={!!error}
																inputRef={ref}
																{...rest}
															/>
														);
													}}
												/>
												<ControlledFormRow
													name="company_bank"
													control={control}
													rules={{}}
													defaultValue={data.company_bank}
													rowProps={{
														label: t('components:SettingsForm.label.company_bank'),
														id: `${token}_company_bank`,
														helpTexts: [ t('components:SettingsForm.help.company_bank') ],
													}}
													render={({ field, fieldState }) => {
														const { ref, ...rest } = field;
														const { error } = fieldState;

														return (
															<Input
																placeholder={t('components:SettingsForm.placeholder.company_bank')}
																id={`${token}_company_bank`}
																error={!!error}
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
										index={panels[1].index}
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
																id={`${token}_active`}
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
										index={panels[2].index}
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
										index={panels[3].index}
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
							</>
						);
					}}
					renderActions={(form) => {
						const {
							token,
							form: {
								formState: {
									isDirty,
									isValid,
								}
							},
						} = form;

						return (
							<>
								<SubmitButton
									disabled={(isDirty && !isValid)}
								/>
							</>
						);
					}}
				/>
			) : (
				<BlockPreloader />
			)}
		</>
	);
};

export default SettingsForm;
