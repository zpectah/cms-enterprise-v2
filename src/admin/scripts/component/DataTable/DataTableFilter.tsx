import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Stack } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';

import {
	SearchInput,
	Select,
	IconButton,
	CloseIconButton,
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
	const [ dirty, setDirty ] = useState(false);

	const changeHandler = (key, value) => {
		let obj = {
			...filter,
		};
		obj[key] = value;
		setFilter(obj);
		onFilterChange(obj);
	};

	// console.log('...', optionsCategories, optionsTags);

	const resetHandler = () => {
		const tmp = {
			...filterDefaultValue,
		};
		setFilter(tmp);
		onFilterChange(tmp);
		setTimeout(() => setDirty(false), 0);
	};

	useEffect(() => {
		console.log('filter a', filter);
		console.log('filter b', filterDefaultValue);
		console.log('filter dirty', filter !== filterDefaultValue);
		setDirty(filter !== filterDefaultValue);
	}, [ filter ]);

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
					inputType="text"
					endAdornment={
						<Stack
							direction="row"
							spacing={1}
							alignItems="center"
						>
							{dirty ? (
								<CloseIconButton
									onClick={() => resetHandler()}
								/>
							) : (
								<div
									style={{ width: '28px' }}
								/>
							)}
							<IconButton>
								<TuneIcon fontSize="small" />
							</IconButton>
						</Stack>
					}
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
