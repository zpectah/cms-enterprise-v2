import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
	Stack,
	Box,
	BoxProps,
	Menu,
	MenuItem,
	Divider,
	FormLabel,
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';

import {
	SearchInput,
	Select,
	IconButton,
	CloseIconButton,
	Button,
	PrimaryButton,
} from '../ui';
import { filterDefaultValue } from './utils';
import {
	filterProps,
	optionsItemProps,
} from './types';

export type filterTmpProps = {
	type: string,
	categories?: filterProps['categories'],
	tags?: filterProps['tags'],
};
export interface DataTableFilterProps {
	onFilterChange: (filter: filterProps) => void;
	optionsType: optionsItemProps[];
	optionsCategories?: optionsItemProps[];
	optionsTags?: optionsItemProps[];
}

const filterDefaultTmp: filterTmpProps = {
	type: filterDefaultValue.type,
	categories: filterDefaultValue.categories,
	tags: filterDefaultValue.tags,
};

const DataTableFilter = (props: DataTableFilterProps) => {
	const {
		onFilterChange,
		optionsType = [],
		optionsCategories = [],
		optionsTags = [],
	} = props;

	const { t } = useTranslation([ 'table' ]);
	const [ filter, setFilter ] = useState<filterProps>(filterDefaultValue);
	const [ filterTmp, setFilterTmp ] = useState<filterTmpProps>(filterDefaultTmp);
	const [ dirty, setDirty ] = useState(false);
	const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null);

	const inputRef = useRef();
	const open = Boolean(anchorEl);
	const openHandler = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(inputRef.current);
	};
	const closeHandler = () => {
		setAnchorEl(null);
	};
	const changeHandler = (key, value) => {
		let obj = {
			...filter,
		};
		obj[key] = value;
		setFilter(obj);
		onFilterChange(obj);
	};
	const resetHandler = () => {
		const tmp = {
			...filterDefaultValue,
		};
		setFilterTmp({
			...filterDefaultTmp,
		});
		setFilter(tmp);
		onFilterChange(tmp);
		setTimeout(() => setDirty(false), 0);
	};
	const filterTrigger = () => {
		const tmp = {
			...filter,
			...filterTmp,
		};
		setFilter(tmp);
		onFilterChange(tmp);
		closeHandler();
	};

	useEffect(() => {
		setDirty(filter !== filterDefaultValue);
	}, [ filter ]);

	return (
		<Box
			ref={inputRef}
		>
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
								onClick={resetHandler}
							/>
						) : (
							<div
								style={{ width: '28px' }}
							/>
						)}
						<IconButton
							id="data-table-filter-search_button"
							onClick={openHandler}
							aria-controls={open ? 'data-table-filter-search' : undefined}
							aria-expanded={open ? 'true' : undefined}
							aria-haspopup="true"
						>
							<TuneIcon fontSize="small" />
						</IconButton>
					</Stack>
				}
				sx={{
					width: '300px',
				}}
			/>
			<Menu
				id="data-table-filter-search"
				MenuListProps={{
					'aria-labelledby': `data-table-filter-search_button`,
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={closeHandler}

			>
				<Stack
					direction="column"
					style={{
						width: '35vw',
						padding: '1rem',
					}}
				>
					<div
						style={{
							paddingBottom: '1rem',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<FormLabel
							htmlFor="data-table-filter_types"
							sx={{
								width: '50%',
							}}
						>
							{t('table:filter.type')}
						</FormLabel>
						<Select
							options={optionsType}
							value={filterTmp.type}
							onChange={(e) => {
								const tmp = {
									...filterTmp,
									type: e.target.value as string,
								};
								setFilterTmp(tmp);
							}}
							placeholder={t('table:filter.type')}
							style={{
								minWidth: '150px',
							}}
							inputProps={{
								id: 'data-table-filter_types',
							}}
						/>
					</div>
					{optionsCategories.length > 0 && (
						<div
							style={{
								paddingBottom: '1rem',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
							}}
						>
							<FormLabel
								htmlFor="data-table-filter_categories"
								sx={{
									width: '50%',
								}}
							>
								{t('table:filter.categories')}
							</FormLabel>
							<Select
								options={optionsCategories}
								value={filterTmp.categories}
								onChange={(e) => {
									const tmp = {
										...filterTmp,
										categories: e.target.value as (number | string)[],
									};
									setFilterTmp(tmp);
								}}
								placeholder={t('table:filter.categories')}
								style={{
									minWidth: '150px',
								}}
								inputProps={{
									id: 'data-table-filter_categories',
								}}
								multiple
							/>
						</div>
					)}
					{optionsTags.length > 0 && (
						<div
							style={{
								paddingBottom: '1rem',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
							}}
						>
							<FormLabel
								htmlFor="data-table-filter_tags"
								sx={{
									width: '50%',
								}}
							>
								{t('table:filter.tags')}
							</FormLabel>
							<Select
								options={optionsTags}
								value={filterTmp.tags}
								onChange={(e) => {
									const tmp = {
										...filterTmp,
										tags: e.target.value as (number | string)[],
									};
									setFilterTmp(tmp);
								}}
								placeholder={t('table:filter.tags')}
								style={{
									minWidth: '150px',
								}}
								inputProps={{
									id: 'data-table-filter_tags',
								}}
								multiple
							/>
						</div>
					)}
					<div
						style={{
							width: '100%',
							paddingTop: '1rem',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-end',
						}}
					>
						<PrimaryButton
							size="small"
							variant="outlined"
							onClick={filterTrigger}
						>
							{t('table:filter.trigger')}
						</PrimaryButton>
					</div>
				</Stack>
			</Menu>
		</Box>
	);
};

export default DataTableFilter;
