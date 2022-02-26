import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import config from '../../config';
import { EMAIL_REGEX } from '../../constants';
import routes from '../../routes';
import { settingsProps } from '../../types/app';
import {
	ControlledForm,
	Tabs,
	TabPanel,
	Section,
	ControlledFormRow,
	FormRow,
	Input,
	Textarea,
	SubmitButton,
	BarPreloader,
	BlockPreloader,
	SwitchControlled,
	TagPicker,
	Select,
} from '../../component/ui';
import SettingsLanguageList from './SettingsLanguageList';
import SettingsLanguageInstaller from './SettingsLanguageInstaller';
import getOptionsList from '../../utils/getOptionsList';

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
			key: 'languages',
			label: t('components:SettingsForm.panel.languages'),
		},
		{
			index: 4,
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

	const getIndexOptions = useCallback(() => getOptionsList(config.options.common.meta_robots, t), []);

	return (
		<>
			{loading && <BarPreloader />}
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
								setValue,
								watch,
							},
						} = form;

						const watchLanguageActive = watch('language_active');
						const watchLanguageDefault = watch('language_default');

						return (
							<>
								<Tabs
									labels={[
										panels[0].label,
										panels[1].label,
										panels[2].label,
										panels[3].label,
										panels[4].label,
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
												divider
											>
												<ControlledFormRow
													name="project_name"
													control={control}
													rules={{ required: true }}
													defaultValue={data.project_name}
													rowProps={{
														label: t('components:SettingsForm.label.project_name'),
														id: `${token}_project_name`,
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
											<Section
												title={t('components:SettingsForm.section.meta')}
												divider
											>

												<ControlledFormRow
													name="web_meta_title"
													control={control}
													rules={{ required: true }}
													defaultValue={data.web_meta_title}
													rowProps={{
														label: t('components:SettingsForm.label.web_meta_title'),
														id: `${token}_web_meta_title`,
													}}
													render={({ field, fieldState }) => {
														const { ref, ...rest } = field;
														const { error } = fieldState;

														return (
															<Input
																placeholder={t('components:SettingsForm.placeholder.web_meta_title')}
																id={`${token}_web_meta_title`}
																error={!!error}
																required
																inputRef={ref}
																{...rest}
															/>
														);
													}}
												/>
												<ControlledFormRow
													name="web_meta_description"
													control={control}
													rules={{ required: true }}
													defaultValue={data.web_meta_description}
													rowProps={{
														label: t('components:SettingsForm.label.web_meta_description'),
														id: `${token}_web_meta_description`,
													}}
													render={({ field, fieldState }) => {
														const { ref, ...rest } = field;
														const { error } = fieldState;

														return (
															<Textarea
																placeholder={t('components:SettingsForm.placeholder.web_meta_description')}
																id={`${token}_web_meta_description`}
																error={!!error}
																inputRef={ref}
																{...rest}
															/>
														);
													}}
												/>
												<ControlledFormRow
													name="web_meta_keywords"
													control={control}
													rules={{ required: true }}
													defaultValue={data.web_meta_keywords}
													rowProps={{
														label: t('components:SettingsForm.label.web_meta_keywords'),
														id: `${token}_web_meta_keywords`,
													}}
													render={({ field, fieldState }) => {
														const { value, onChange } = field;

														return (
															<TagPicker
																value={value}
																onChange={onChange}
																id={`${token}_web_meta_keywords`}
																placeholder={t('components:SettingsForm.placeholder.web_meta_keywords')}
															/>
														);
													}}
												/>
												<ControlledFormRow
													name="web_meta_robots"
													control={control}
													rules={{ required: true }}
													defaultValue={data.web_meta_robots}
													rowProps={{
														label: t('components:SettingsForm.label.web_meta_robots'),
														id: `${token}_web_meta_robots`,
													}}
													render={({ field, fieldState }) => {
														const { ref, ...rest } = field;
														const { error } = fieldState;

														return (
															<Select
																options={getIndexOptions()}
																placeholder={t('components:SettingsForm.placeholder.web_meta_robots')}
																id={`${token}_web_meta_robots`}
																error={!!error}
																required
																inputRef={ref}
																{...rest}
															/>
														);
													}}
												/>

											</Section>
											<Section
												title={t('components:SettingsForm.section.modes')}
												divider
											>

												<ControlledFormRow
													name="web_mode_debug"
													control={control}
													rules={{}}
													defaultValue={data.web_mode_debug}
													rowProps={{
														emptyLabel: true,
													}}
													render={({ field }) => {
														const { ref, value, ...rest } = field;

														return (
															<SwitchControlled
																id={`${token}_web_mode_debug`}
																label={t('components:SettingsForm.label.web_mode_debug')}
																checked={value}
																inputRef={ref}
																{...rest}
															/>
														);
													}}
												/>
												<ControlledFormRow
													name="web_mode_maintenance"
													control={control}
													rules={{}}
													defaultValue={data.web_mode_maintenance}
													rowProps={{
														emptyLabel: true,
													}}
													render={({ field }) => {
														const { ref, value, ...rest } = field;

														return (
															<SwitchControlled
																id={`${token}_web_mode_maintenance`}
																label={t('components:SettingsForm.label.web_mode_maintenance')}
																checked={value}
																inputRef={ref}
																{...rest}
															/>
														);
													}}
												/>

											</Section>
											<Section
												title={t('components:SettingsForm.section.emails')}
											>

												<ControlledFormRow
													name="form_email_sender"
													control={control}
													rules={{ required: true, pattern: EMAIL_REGEX }}
													defaultValue={data.form_email_sender}
													rowProps={{
														label: t('components:SettingsForm.label.form_email_sender'),
														id: `${token}_form_email_sender`,
													}}
													render={({ field, fieldState }) => {
														const { ref, ...rest } = field;
														const { error } = fieldState;

														return (
															<Input
																type="email"
																placeholder={t('components:SettingsForm.placeholder.form_email_sender')}
																id={`${token}_form_email_sender`}
																error={!!error}
																required
																inputRef={ref}
																{...rest}
															/>
														);
													}}
												/>
												<ControlledFormRow
													name="form_email_recipients"
													control={control}
													rules={{}}
													defaultValue={data.form_email_recipients}
													rowProps={{
														label: t('components:SettingsForm.label.form_email_recipients'),
														id: `${token}_form_email_recipients`,
														helpTexts: [ t('components:SettingsForm.help.form_email_recipients') ],
													}}
													render={({ field, fieldState }) => {
														const { value, onChange } = field;

														return (
															<TagPicker
																value={value}
																onChange={onChange}
																id={`${token}_form_email_recipients`}
																placeholder={t('components:SettingsForm.placeholder.form_email_recipients')}
																inputType="email"
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
											<Section
												title={t('components:SettingsForm.section.comments')}
												divider
											>

												<ControlledFormRow
													name="comments_anonymous_active"
													control={control}
													rules={{}}
													defaultValue={data.comments_anonymous_active}
													rowProps={{
														emptyLabel: true,
													}}
													render={({ field }) => {
														const { ref, value, ...rest } = field;

														return (
															<SwitchControlled
																id={`${token}_comments_anonymous_active`}
																label={t('components:SettingsForm.label.comments_anonymous_active')}
																checked={value}
																inputRef={ref}
																{...rest}
															/>
														);
													}}
												/>
												<ControlledFormRow
													name="comments_global_active"
													control={control}
													rules={{}}
													defaultValue={data.comments_global_active}
													rowProps={{
														emptyLabel: true,
													}}
													render={({ field }) => {
														const { ref, value, ...rest } = field;

														return (
															<SwitchControlled
																id={`${token}_comments_global_active`}
																label={t('components:SettingsForm.label.comments_global_active')}
																checked={value}
																inputRef={ref}
																{...rest}
															/>
														);
													}}
												/>

											</Section>
											<Section
												title={t('components:SettingsForm.section.members')}
											>

												<ControlledFormRow
													name="members_login_active"
													control={control}
													rules={{}}
													defaultValue={data.members_login_active}
													rowProps={{
														emptyLabel: true,
													}}
													render={({ field }) => {
														const { ref, value, ...rest } = field;

														return (
															<SwitchControlled
																id={`${token}_members_login_active`}
																label={t('components:SettingsForm.label.members_login_active')}
																checked={value}
																inputRef={ref}
																{...rest}
															/>
														);
													}}
												/>
												<ControlledFormRow
													name="members_lostPassword_active"
													control={control}
													rules={{}}
													defaultValue={data.members_lostPassword_active}
													rowProps={{
														emptyLabel: true,
													}}
													render={({ field }) => {
														const { ref, value, ...rest } = field;

														return (
															<SwitchControlled
																id={`${token}_members_lostPassword_active`}
																label={t('components:SettingsForm.label.members_lostPassword_active')}
																checked={value}
																inputRef={ref}
																{...rest}
															/>
														);
													}}
												/>
												<ControlledFormRow
													name="members_profile_active"
													control={control}
													rules={{}}
													defaultValue={data.members_profile_active}
													rowProps={{
														emptyLabel: true,
													}}
													render={({ field }) => {
														const { ref, value, ...rest } = field;

														return (
															<SwitchControlled
																id={`${token}_members_profile_active`}
																label={t('components:SettingsForm.label.members_profile_active')}
																checked={value}
																inputRef={ref}
																{...rest}
															/>
														);
													}}
												/>
												<ControlledFormRow
													name="members_register_active"
													control={control}
													rules={{}}
													defaultValue={data.members_register_active}
													rowProps={{
														emptyLabel: true,
													}}
													render={({ field }) => {
														const { ref, value, ...rest } = field;

														return (
															<SwitchControlled
																id={`${token}_members_register_active`}
																label={t('components:SettingsForm.label.members_register_active')}
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
										index={panels[3].index}
										panelValue={panelValue}
									>
										<>
											<Section
												title={t('components:SettingsForm.section.language_list')}
												divider
											>
												<SettingsLanguageList
													installed={data.language_installed}
													active={data.language_active}
													current={data.language_default}
													onChange={(languageObject) => {
														setValue('language_active', languageObject.active);
														setValue('language_default', languageObject.default);
													}}
												/>
											</Section>
											<Section
												title={t('components:SettingsForm.section.language_install')}
											>
												<SettingsLanguageInstaller
													installed={data.language_installed}
													active={watchLanguageActive}
													current={watchLanguageDefault}
													afterInstall={(lang) => {
														console.log('afterInstall lang', lang);
														// TODO: reload data
													}}
												/>
											</Section>
										</>
									</TabPanel>
									<TabPanel
										index={panels[4].index}
										panelValue={panelValue}
									>
										<>

											<Section>

												... maintenance content ... Dynamic triggers ...

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
