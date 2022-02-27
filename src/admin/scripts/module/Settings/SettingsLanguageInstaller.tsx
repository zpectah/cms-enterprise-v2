import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Stack } from '@mui/material';

import config from '../../config';
import useToasts from '../../hooks/useToasts';
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

	const { t } = useTranslation([ 'components' ]);
	const [ selectedLanguage, setSelectedLanguage ] = useState<string>('');
	const [ sourceLanguage, setSourceLanguage ] = useState<string>(current);
	const [ installing, setInstalling ] = useState(false);
	const { createSuccessToast } = useToasts();

	const installHandler = () => {
		setInstalling(true);
		const lang = selectedLanguage;
		const master: installerRequestProps = {
			current: lang,
			installed: [
				...installed,
				lang,
			],
			active: [
				...active,
				lang,
			],
		};
		console.log('installHandler master', master);

		// TODO

		// after install callback
		createSuccessToast({ title: t('components:SettingsForm.language_installer.success_message') });
		afterInstall(master);
		setSelectedLanguage('');
		setInstalling(false);
	};
	const getLanguageOptions = useCallback(() => {
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
	const getLanguageSource = useCallback(() => {
		const list = [];
		installed.map((lang) => {
			const langObject = config.locales[lang];
			list.push({
				key: langObject.int,
				value: langObject.int,
				label: langObject.label_int,
				disabled: !active.includes(langObject.int),
			});
		});

		return list;
	}, [ config, active ]);

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
						options={getLanguageOptions()}
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
						options={getLanguageSource()}
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
