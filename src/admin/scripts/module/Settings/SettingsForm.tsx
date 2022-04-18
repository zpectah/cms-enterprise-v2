import React, { useMemo, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import ApartmentIcon from '@mui/icons-material/Apartment';
import WebIcon from '@mui/icons-material/Web';
import LanguageIcon from '@mui/icons-material/Language';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

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
	Input,
	Textarea,
	PrimaryButton,
	BarPreloader,
	BlockPreloader,
	SwitchControlled,
	TagPicker,
	Select,
} from '../../component/ui';
import LocationPicker from '../../component/LocationPicker';
import SettingsLanguageList from './SettingsLanguageList';
import SettingsLanguageInstaller, { installerRequestProps } from './SettingsLanguageInstaller';
import SettingsBlacklist from './SettingsBlacklist';
import SettingsMaintenancePanel from './SettingsMaintenancePanel';
import getOptionsList from '../../utils/getOptionsList';

interface SettingsFormProps {
	data: settingsProps;
	onSubmit: (master: settingsProps) => Promise<unknown>;
	loading: boolean;
	afterLanguageInstall: (lang: installerRequestProps) => void;
	actions: {
		view: boolean,
		update: boolean,
		language: boolean,
		maintenance: boolean,
		blacklist: boolean,
	};
}

const SettingsForm = (props: SettingsFormProps) => {
	const {
		data,
		onSubmit,
		loading,
		afterLanguageInstall,
		actions,
	} = props;

	const { t } = useTranslation([ 'common', 'components' ]);
	const params = useParams();
	const navigate = useNavigate();
	const [ panelValue, setPanelValue ] = useState<number>(0);
	const [ submitting, setSubmitting ] = useState(false);

	const panels = [
		{
			index: 0,
			key: 'global',
			label: t('components:SettingsForm.panel.global'),
			icon: <ApartmentIcon fontSize="small" />,
			hidden: !actions.view,
		},
		{
			index: 1,
			key: 'web',
			label: t('components:SettingsForm.panel.web'),
			icon: <WebIcon fontSize="small" />,
			hidden: !actions.view,
		},
		{
			index: 2,
			key: 'content',
			label: t('components:SettingsForm.panel.content'),
			icon: <ContentPasteIcon fontSize="small" />,
			hidden: !actions.view,
		},
		{
			index: 3,
			key: 'languages',
			label: t('components:SettingsForm.panel.languages'),
			icon: <LanguageIcon fontSize="small" />,
			hidden: !(actions.view && actions.language),
		},
		{
			index: 4,
			key: 'maintenance',
			label: t('components:SettingsForm.panel.maintenance'),
			icon: <CleaningServicesIcon fontSize="small" />,
			hidden: !(actions.view && actions.maintenance),
		},
		{
			index: 5,
			key: 'blacklist',
			label: t('components:SettingsForm.panel.blacklist'),
			icon: <ListAltIcon fontSize="small" />,
			hidden: !(actions.view && actions.blacklist),
		},
	];
	const panelChangeHandler = (e, value: number) => navigate(`/admin/app/${routes.settings.path}/${panels[value].key}`);
	const submitHandler = (data: any) => {
		setSubmitting(true);
		const master = _.cloneDeep(data);
		return onSubmit(master).then(() => {
			setSubmitting(false);
		});
	};
	const afterLanguageInstallHandler = (lang: installerRequestProps) => {
		if (afterLanguageInstall) afterLanguageInstall(lang);
	};

	useEffect(() => {
		if (params['*']) {
			panels.map((panel) => {
				if (params['*'] === panel.key) {
					if (panel.hidden) {
						navigate(`/admin/app/${routes.settings.path}/${panels[0].key}`);
					} else {
						setPanelValue(panel.index);
					}
				}
			});
		} else {
			navigate(`/admin/app/${routes.settings.path}/${panels[0].key}`);
		}
	}, [ params ]);

	const options_index = useMemo(() => getOptionsList(config.options.common.meta_robots, t), []);

	return (
		<>
			{loading && <BarPreloader />}
			{data ? (
				<ControlledForm
					mandatoryInfo
					dataId="UsersDetailForm"
					defaultValues={data}
					onSubmit={submitHandler}
					errorMessage={t('components:SettingsForm.error_global')}
					renderMain={(form) => {
						const {
							token,
							form: {
								control,
								setValue,
								watch,
							},
						} = form;

						const watchLanguageInstalled = watch('language_installed');
						const watchLanguageActive = watch('language_active');
						const watchLanguageDefault = watch('language_default');
						const watchCommentsGlobal = watch('comments_global_active');
						const watchMembersGlobal = watch('members_enabled');

						return (
							<Tabs
								items={panels}
								activeValue={panelValue}
								onChange={panelChangeHandler}
								variant="scrollable"
								scrollButtons="auto"
							>
								{!panels[0].hidden && (
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
														helpTexts: [ t('components:SettingsForm.help.company_phone') ],
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
														const {
															ref,
															value,
															onChange,
														} = field;
														const { error } = fieldState;

														return (
															<LocationPicker
																placeholder={t('components:SettingsForm.placeholder.company_location')}
																id={`${token}_company_location`}
																inputRef={ref}
																error={!!error}
																value={value}
																onSelect={onChange}
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
								)}
								{!panels[1].hidden && (
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
																options={options_index}
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
												divider
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
											<Section
												title={t('components:SettingsForm.section.social_profiles')}
											>
												<ControlledFormRow
													name="social_url_facebook"
													control={control}
													rules={{}}
													defaultValue={data.social_url_facebook}
													rowProps={{
														label: t('components:SettingsForm.label.facebook'),
														id: `${token}_social_url_facebook`,
													}}
													render={({ field, fieldState }) => {
														const { ref, ...rest } = field;
														const { error } = fieldState;

														return (
															<Input
																placeholder={t('components:SettingsForm.placeholder.facebook')}
																id={`${token}_social_url_facebook`}
																error={!!error}
																inputRef={ref}
																{...rest}
															/>
														);
													}}
												/>
												<ControlledFormRow
													name="social_url_twitter"
													control={control}
													rules={{}}
													defaultValue={data.social_url_twitter}
													rowProps={{
														label: t('components:SettingsForm.label.twitter'),
														id: `${token}_social_url_twitter`,
													}}
													render={({ field, fieldState }) => {
														const { ref, ...rest } = field;
														const { error } = fieldState;

														return (
															<Input
																placeholder={t('components:SettingsForm.placeholder.twitter')}
																id={`${token}_social_url_twitter`}
																error={!!error}
																inputRef={ref}
																{...rest}
															/>
														);
													}}
												/>
												<ControlledFormRow
													name="social_url_linkedin"
													control={control}
													rules={{}}
													defaultValue={data.social_url_linkedin}
													rowProps={{
														label: t('components:SettingsForm.label.linkedin'),
														id: `${token}_social_url_linkedin`,
													}}
													render={({ field, fieldState }) => {
														const { ref, ...rest } = field;
														const { error } = fieldState;

														return (
															<Input
																placeholder={t('components:SettingsForm.placeholder.linkedin')}
																id={`${token}_social_url_linkedin`}
																error={!!error}
																inputRef={ref}
																{...rest}
															/>
														);
													}}
												/>
												<ControlledFormRow
													name="social_url_youtube"
													control={control}
													rules={{}}
													defaultValue={data.social_url_youtube}
													rowProps={{
														label: t('components:SettingsForm.label.youtube'),
														id: `${token}_social_url_youtube`,
													}}
													render={({ field, fieldState }) => {
														const { ref, ...rest } = field;
														const { error } = fieldState;

														return (
															<Input
																placeholder={t('components:SettingsForm.placeholder.youtube')}
																id={`${token}_social_url_youtube`}
																error={!!error}
																inputRef={ref}
																{...rest}
															/>
														);
													}}
												/>
												<ControlledFormRow
													name="social_url_twitch"
													control={control}
													rules={{}}
													defaultValue={data.social_url_twitch}
													rowProps={{
														label: t('components:SettingsForm.label.twitch'),
														id: `${token}_social_url_twitch`,
													}}
													render={({ field, fieldState }) => {
														const { ref, ...rest } = field;
														const { error } = fieldState;

														return (
															<Input
																placeholder={t('components:SettingsForm.placeholder.twitch')}
																id={`${token}_social_url_twitch`}
																error={!!error}
																inputRef={ref}
																{...rest}
															/>
														);
													}}
												/>
												<ControlledFormRow
													name="social_url_github"
													control={control}
													rules={{}}
													defaultValue={data.social_url_facebook}
													rowProps={{
														label: t('components:SettingsForm.label.github'),
														id: `${token}_social_url_github`,
													}}
													render={({ field, fieldState }) => {
														const { ref, ...rest } = field;
														const { error } = fieldState;

														return (
															<Input
																placeholder={t('components:SettingsForm.placeholder.github')}
																id={`${token}_social_url_github`}
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
								)}
								{!panels[2].hidden && (
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
																disabled={!watchCommentsGlobal}
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
													name="members_enabled"
													control={control}
													rules={{}}
													defaultValue={data.members_enabled}
													rowProps={{
														emptyLabel: true,
													}}
													render={({ field }) => {
														const { ref, value, ...rest } = field;

														return (
															<SwitchControlled
																id={`${token}_members_enabled`}
																label={t('components:SettingsForm.label.members_enabled')}
																checked={value}
																inputRef={ref}
																{...rest}
															/>
														);
													}}
												/>
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
																disabled={!watchMembersGlobal}
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
																disabled={!watchMembersGlobal}
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
																disabled={!watchMembersGlobal}
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
																disabled={!watchMembersGlobal}
																{...rest}
															/>
														);
													}}
												/>

											</Section>
										</>
									</TabPanel>
								)}
								{!panels[3].hidden && (
									<TabPanel
										index={panels[3].index}
										panelValue={panelValue}
									>
										<>
											<Section
												title={t('components:SettingsForm.section.language_list')}
											>
												<SettingsLanguageList
													installed={watchLanguageInstalled}
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
													installed={watchLanguageInstalled}
													active={watchLanguageActive}
													current={watchLanguageDefault}
													afterInstall={(master) => {
														afterLanguageInstallHandler(master);
														setValue('language_installed', master.installed);
													}}
												/>
											</Section>
										</>
									</TabPanel>
								)}
								{!panels[4].hidden && (
									<TabPanel
										index={panels[4].index}
										panelValue={panelValue}
									>
										<Section
											title={t('components:SettingsForm.section.maintenance')}
											subtitle={t('components:SettingsForm.section.maintenance_subtitle')}
											children={<SettingsMaintenancePanel />}
										/>
									</TabPanel>
								)}
								{!panels[5].hidden && (
									<TabPanel
										index={panels[5].index}
										panelValue={panelValue}
									>
										<Section
											title={t('components:SettingsForm.section.blacklist')}
											subtitle={t('components:SettingsForm.section.blacklist_subtitle')}
											children={<SettingsBlacklist />}
										/>
									</TabPanel>
								)}
							</Tabs>
						);
					}}
					renderActions={({ form: { formState: { isValid } } }) => (
						<>
							{actions.view && (
								<PrimaryButton
									type="submit"
									disabled={!isValid || !actions.update}
									loading={submitting}
								>
									{t('btn.save_changes')}
								</PrimaryButton>
							)}
						</>
					)}
				/>
			) : (
				<BlockPreloader />
			)}
		</>
	);
};

export default SettingsForm;
