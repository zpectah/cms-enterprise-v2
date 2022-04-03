import React, { useState, useMemo } from 'react';
import i18n from 'i18next';

import config from '../../config';
import LanguageService from '../../service/Language.service';
import { DropdownMenu, Button } from '../ui';

export interface LanguageSwitcherProps {
	onLanguageChange?: (lang: string) => void;
}

const LanguageSwitcher = (props: LanguageSwitcherProps) => {
	const { onLanguageChange } = props;

	const [ lang, setLang ] = useState<string>(LanguageService.get());

	const handleChange = (lang: string) => {
		setLang(lang);
		LanguageService.set(lang);
		i18n
			.changeLanguage(lang)
			.then(() => {
				if (onLanguageChange) onLanguageChange(lang);
			});
	};

	const languages_list = useMemo(() => {
		const items = [];
		config.project.admin.language.list.map((lng) => {
			items.push({
				key: lng,
				value: lng,
				label: config.locales[lng].label,
				onClick: () => handleChange(lng),
			});
		})

		return items;
	}, []);

	return (
		<DropdownMenu
			id="LanguageSwitcherMenu"
			renderButton={(btnProps) => (
				<Button
					{...btnProps}
					color="secondary"
					variant="outlined"
					sx={{
						minWidth: '50px',
						pl: .5,
						pr: .5,
					}}
				>
					{config.locales[lang].key}
				</Button>
			)}
			options={languages_list}
		/>
	);
};

export default LanguageSwitcher;
