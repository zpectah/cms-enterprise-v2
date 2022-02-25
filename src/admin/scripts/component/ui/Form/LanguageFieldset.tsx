import React, { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material';

import config from '../../../config';
import { LANGUAGE_OPTION_DEFAULT } from '../../../constants';
import useSettings from '../../../hooks/useSettings';
import { Select } from '../Select';

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
	padding: 2rem 1rem;
	border: 1px dotted rgba(175,175,175,.35);
	border-radius: 4px;
`;
const StyledLegend = styled('legend')``;
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
					<Select
						value={lang}
						onChange={(e) => changeHandler(e.target.value)}
						size="small"
						options={getLanguageOptions()}
					/>
				) : (
					<>Loading ...</>
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
