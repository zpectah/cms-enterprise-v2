import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Stack } from '@mui/material';

import config from '../../config';
import useToasts from '../../hooks/useToasts';
import useSystem from '../../hooks/useSystem';
import {
	Select,
	SuccessButton,
} from '../../component/ui';

export type installerRequestProps = {
	current: string,
	installed: string[],
	active: string[],
};
export interface SettingsLanguageInstallerProps {
	installed: string[];
	active: string[];
	current: string;
	afterInstall: (request: installerRequestProps) => void;
}

const SettingsLanguageInstaller = (props: SettingsLanguageInstallerProps) => {
	const {
		installed = [],
		active = [],
		current,
		afterInstall,
	} = props;

	const { t } = useTranslation([ 'components', 'types' ]);
	const [ selectedLanguage, setSelectedLanguage ] = useState<string>('');
	const [ sourceLanguage, setSourceLanguage ] = useState<string>(current);
	const [ installing, setInstalling ] = useState(false);
	const { createSuccessToast } = useToasts();
	const { installLanguage } = useSystem();

	const installHandler = () => {
		setInstalling(true);
		const lang = selectedLanguage;
		const master = {
			lang_source: sourceLanguage,
			lang_target: lang,
			installed: [
				...installed,
				lang,
			],
		};
		installLanguage(master).then((resp) => {
			createSuccessToast({ title: t('components:SettingsForm.language_installer.success_message') });
			afterInstall({
				current: lang,
				installed: [
					...installed,
					lang,
				],
				active: [
					...active,
					lang,
				],
			});
			setSelectedLanguage('');
			setInstalling(false);
		});
	};
	const options_language = useMemo(() => {
		const list = [];
		for (const key in config.locales) {
			const langObject = config.locales[key];
			list.push({
				key: langObject.int,
				value: langObject.int,
				label: langObject.label_int,
				disabled: installed.includes(langObject.int),
			});
		}

		return list;
	}, [ config ]);
	const options_sources = useMemo(() => {
		const list = [];
		if (installed.length === 0) {
			list.push({
				key: 'empty',
				value: 'empty',
				label: t('types:empty'),
				disabled: false,
			});
		} else {
			installed.map((lang) => {
				const langObject = config.locales[lang];
				list.push({
					key: langObject.int,
					value: langObject.int,
					label: langObject.label_int,
					disabled: !active.includes(langObject.int),
				});
			});
		}

		return list;
	}, [ config, active, installed ]);

	useEffect(() => {
		if (current) setSourceLanguage(current);
	}, [ current ]);

	return (
		<>
			<Stack
				direction="row"
				spacing={2}
				alignItems="center"
				justifyContent="flex-start"
			>
				<div>
					<Select
						options={options_language}
						value={selectedLanguage}
						onChange={(e) => setSelectedLanguage(e.target.value as string)}
						label={t('components:SettingsForm.language_installer.new_language_label')}
						sx={{
							width: '200px',
						}}
					/>
				</div>
				<div>
					<Select
						options={options_sources}
						value={sourceLanguage}
						onChange={(e) => setSourceLanguage(e.target.value as string)}
						label={t('components:SettingsForm.language_installer.source_language_label')}
						sx={{
							width: '200px',
						}}
					/>
				</div>
				<SuccessButton
					onClick={installHandler}
					disabled={selectedLanguage === ''}
					loading={installing}
				>
					{t('components:SettingsForm.language_installer.btn_install')}
				</SuccessButton>
			</Stack>
		</>
	);
};

export default SettingsLanguageInstaller;
