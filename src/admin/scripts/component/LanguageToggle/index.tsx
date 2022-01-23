import React, { useState } from 'react';
import i18n from 'i18next';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import config from '../../config';
import LanguageService from '../../service/Language.service';

interface LanguageToggleProps {}

const LanguageToggle = (props: LanguageToggleProps) => {
	const {} = props;
	const [lang, setLang] = useState<string>(LanguageService.get());

	const handleChange = (event: React.MouseEvent<HTMLElement>, lang: string) => {
		setLang(lang);
		LanguageService.set(lang);
		i18n
			.changeLanguage(lang)
			.then(() => console.info('Language has changed to:', lang));
	};

	return (
		<>
			<ToggleButtonGroup
				color="secondary"
				size="small"
				value={lang}
				onChange={handleChange}
				exclusive
			>
				{config.project.admin.language.list.map((item) => (
					<ToggleButton key={item} value={item}>
						{config.locales[item].label}
					</ToggleButton>
				))}
			</ToggleButtonGroup>
		</>
	);
};

export default LanguageToggle;
