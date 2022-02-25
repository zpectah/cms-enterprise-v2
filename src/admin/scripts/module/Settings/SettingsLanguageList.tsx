import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';

import config from '../../config';
import { LANGUAGE_OPTION_DEFAULT } from '../../constants';
import {
	Checkbox,
	Radio,
} from '../../component/ui';

export interface langOptionsProps {
	active: string[];
	default: string;
}
export interface SettingsLanguageListProps {
	installed: string[];
	active: string[];
	current: string;
	onChange: (languageObject: langOptionsProps) => void;
}

const SettingsLanguageList = (props: SettingsLanguageListProps) => {
	const {
		installed = [],
		active = [],
		current,
		onChange,
	} = props;

	const { t } = useTranslation([ 'components' ]);
	const [ langModel, setLangModel ] = useState<langOptionsProps>({
		active: active,
		default: current,
	});

	const onActiveToggle = (lang: string) => {
		const list = [
			...langModel.active,
		];
		const index = list.indexOf(lang);
		if (!(index > -1)) {
			list.push(lang);
		} else {
			list.splice(index, 1);
		}
		const model = {
			...langModel,
			active: list,
		};
		setLangModel(model);
		onChange(model);
	};
	const onDefaultToggle = (lang: string) => {
		const model = {
			...langModel,
			default: lang,
		};
		setLangModel(model);
		onChange(model);
	};

	return (
		<TableContainer>
			<Table
				sx={{
					minWidth: 650,
					mb: 2,
				}}
				aria-label="Installed languages"
			>
				<TableHead>
					<TableRow>
						<TableCell>
							{t('components:SettingsForm.language_table.label.language')}
						</TableCell>
						<TableCell>
							{t('components:SettingsForm.language_table.label.key')}
						</TableCell>
						<TableCell>
							{t('components:SettingsForm.language_table.label.active')}
						</TableCell>
						<TableCell>
							{t('components:SettingsForm.language_table.label.default')}
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{installed.map((lang) => (
						<TableRow
							key={lang}
						>
							<TableCell>
								<Typography variant="subtitle1">
									{config.locales[lang].label}
								</Typography>
								<Typography variant="caption">
									{config.locales[lang].label_int}
								</Typography>
							</TableCell>
							<TableCell>
								{lang}
							</TableCell>
							<TableCell>
								<Checkbox
									checked={langModel.active.includes(lang)}
									onClick={() => onActiveToggle(lang)}
								/>
							</TableCell>
							<TableCell>
								<Radio
									checked={lang === langModel.default}
									onClick={() => onDefaultToggle(lang)}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default SettingsLanguageList;
