import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Stack } from '@mui/material';

import config from '../../config';
import {
	Select,
	Button,
} from '../../component/ui';

export interface SettingsLanguageInstallerProps {
	installed: string[];
	afterInstall: (lang: string) => void;
}

const SettingsLanguageInstaller = (props: SettingsLanguageInstallerProps) => {
	const {
		installed = [],
		afterInstall,
	} = props;

	const { t } = useTranslation([ 'components' ]);
	const [ selectedLanguage, setSelectedLanguage ] = useState<string>('');
	const [ installing, setInstalling ] = useState(false);

	const installHandler = () => {
		setInstalling(true);
		const lang = selectedLanguage;
		console.log('installHandler', selectedLanguage);

		// TODO

		// after install callback
		afterInstall(lang);
		setSelectedLanguage('');
		setInstalling(false);
	};
	const getLanguageList = () => {
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
	};

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
						options={getLanguageList()}
						value={selectedLanguage}
						onChange={(e) => setSelectedLanguage(e.target.value as string)}
						label="Select language"
						placeholder="Language to install"
						sx={{
							width: '200px',
						}}
					/>
				</div>
				<Button
					variant="outlined"
					color="success"
					onClick={installHandler}
					disabled={selectedLanguage === ''}
					loading={installing}
				>
					Install
				</Button>
			</Stack>
		</>
	);
};

export default SettingsLanguageInstaller;
