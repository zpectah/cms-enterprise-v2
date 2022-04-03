import React, { useMemo, useState } from 'react';
import i18n from 'i18next';

import config from '../../config';
import LanguageService from '../../service/Language.service';
import { Toggle } from '../ui';

interface LanguageToggleProps {
	onLanguageChange?: (lang: string) => void;
}

const LanguageToggle = (props: LanguageToggleProps) => {
	const { onLanguageChange } = props;

	const [ lang, setLang ] = useState<string>(LanguageService.get());

	const handleChange = (event: React.MouseEvent<HTMLElement>, lang: string) => {
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
				children: (
					<>{config.locales[lng].label}</>
				),
			});
		})

		return items;
	}, []);

	return (
		<Toggle
			color="primary"
			size="small"
			value={lang}
			onChange={handleChange}
			exclusive
			items={languages_list}
		/>
	);
};

export default LanguageToggle;
