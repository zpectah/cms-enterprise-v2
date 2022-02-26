import React, { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import config from '../../../config';
import { LANGUAGE_OPTION_DEFAULT } from '../../../constants';
import useSettings from '../../../hooks/useSettings';
import { DropdownMenu } from '../Menu';
import { LoadingText } from '../Preloader';

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
const StyledMenuTrigger = styled('a')`
	padding: 0 .5rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	align-content: center;
	justify-content: center;
	font-size: .85rem;
	cursor: pointer;
	
	& > span{
		margin-left: .35rem;
		display: flex;
		font-size: 1rem;
	}
	
`;

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
							<StyledMenuTrigger
								{...button}
							>
								{lang}
								<span
									className="icon"
								>
											{open ? (
												<ExpandLessIcon fontSize="inherit" />
											) : (
												<ExpandMoreIcon fontSize="inherit" />
											)}
									</span>
							</StyledMenuTrigger>
						)}
					/>
				) : (
					<LoadingText />
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
