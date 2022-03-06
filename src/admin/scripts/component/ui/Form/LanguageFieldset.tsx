import React, { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material';

import config from '../../../config';
import { LANGUAGE_OPTION_DEFAULT } from '../../../constants';
import useSettings from '../../../hooks/useSettings';
import { DropdownMenu, MenuTrigger } from '../Menu';
import { TextPreloader } from '../Preloader';

export interface LanguageFieldsetProps {
	render: (
		lang: string,
		languageList: string[],
		changeLanguage: (lang: string) => void,
	) => React.ReactNode;
	onLanguageChange?: (lang: string) => void;
}

const StyledFieldset = styled('fieldset')`
	margin-bottom: 1rem;
	padding: 2rem 0 0 0;
	border: 0;
	border-top: 1px dotted rgba(175,175,175,.35);
`;
const StyledLegend = styled('legend')`
	margin-left: .75rem;
`;
const StyledSection = styled('section')``;

const LanguageFieldset = (props: LanguageFieldsetProps) => {
	const {
		render,
		onLanguageChange,
	} = props;

	const { settings } = useSettings();
	const [ languageList, setLanguageList ] = useState([]);
	const [ lang, setLang ] = useState(LANGUAGE_OPTION_DEFAULT);

	const changeHandler = (value) => {
		setLang(value);
		if (onLanguageChange) onLanguageChange(value);
	};

	const getLanguageOptions = useCallback(() => {
		const list = [];
		languageList.map((lng) => {
			list.push({
				key: lng,
				value: lng,
				label: config.locales[lng].label,
				onClick: () => changeHandler(lng),
				selected: lang === lng,
			});
		});

		return list;
	}, [ lang, languageList ]);

	useEffect(() => {
		if (settings) {
			setLanguageList(settings.language_active);
			setLang(settings.language_default);
			if (onLanguageChange) onLanguageChange(settings.language_default);
		}
	}, [ settings ]);

	return (
		<StyledFieldset>
			<StyledLegend>
				{languageList.length > 0 ? (
					<DropdownMenu
						id="LanguageFieldsetMenu"
						options={getLanguageOptions()}
						renderButton={(button, open) => (
							<MenuTrigger
								label={config.locales[lang].label}
								open={open}
								{...button}
							/>
						)}
					/>
				) : (
					<TextPreloader />
				)}
			</StyledLegend>
			<section>
				{languageList.map((lng) => (
					<StyledSection
						key={lng}
						style={{ display: lng === lang ? 'block' : 'none' }}
					>
						{render(
							lng,
							languageList,
							(lang) => changeHandler(lang),
						)}
					</StyledSection>
				))}
			</section>
		</StyledFieldset>
	);
};

export default LanguageFieldset;
