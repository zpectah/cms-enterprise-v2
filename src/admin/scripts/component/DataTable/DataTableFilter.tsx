import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Stack } from '@mui/material';

import {
	SearchInput,
	Select,
} from '../ui';
import { filterDefaultValue } from './utils';
import {
	filterProps,
	optionsItemProps,
} from './types';

export interface DataTableFilterProps {
	onFilterChange: (filter: filterProps) => void;
	optionsType: optionsItemProps[];
	optionsCategories?: optionsItemProps[];
	optionsTags?: optionsItemProps[];
}

const DataTableFilter = (props: DataTableFilterProps) => {
	const {
		onFilterChange,
		optionsType = [],
		optionsCategories = [],
		optionsTags = [],
	} = props;

	const { t } = useTranslation([ 'table' ]);
	const [ filter, setFilter ] = useState<filterProps>(filterDefaultValue);

	const changeHandler = (key, value) => {
		let obj = {
			...filter,
		};
		obj[key] = value;
		setFilter(obj);
		onFilterChange(obj);
	};

	console.log('...', optionsCategories, optionsTags);

	return (
		<Stack
			direction="row"
			spacing={2}
			alignItems="center"
		>
			<div>
				<SearchInput
					value={filter.search}
					onChange={(e) => changeHandler('search', e.target.value)}
					placeholder={t('table:filter.search')}
				/>
			</div>
			<div>
				<Select
					options={optionsType}
					value={filter.type}
					onChange={(e) => changeHandler('type', e.target.value)}
					placeholder={t('table:filter.type')}
					style={{
						minWidth: '150px',
					}}
				/>
			</div>
		</Stack>
	);
};

export default DataTableFilter;
