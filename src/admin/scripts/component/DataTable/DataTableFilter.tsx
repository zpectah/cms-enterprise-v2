import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
	styled,
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
import placeholder from 'lodash/fp/placeholder';

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

const OuterWrapper = styled(Stack)`
	padding: 1rem;
`;
const RowWrapper = styled('div')`
	padding-bottom: 1rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
const RowLabel = styled(FormLabel)`
	width: 50%;
`;

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

	const { t } = useTranslation([ 'common', 'table' ]);
	const [ filter, setFilter ] = useState<filterProps>(filterDefaultValue);
	const [ filterTmp, setFilterTmp ] = useState<filterTmpProps>(filterDefaultTmp);
	const [ dirty, setDirty ] = useState(false);
	const [ dirtyTmp, setDirtyTmp ] = useState(false);
	const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null);

	const typesActive = optionsType.length > 0;
	const categoriesActive = optionsCategories.length > 0;
	const tagsActive = optionsTags.length > 0;

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

	const getInputPlaceholder = useCallback(() => {
		let placeholder = t('table:filter.search');
		if (dirty) {
			placeholder = '';
			if (filter.type !== 'all') placeholder = `type:${filter.type};`;
			if (filter.categories.length > 0) placeholder += `categories:${JSON.stringify(filter.categories)};`;
			if (filter.tags.length > 0) placeholder += `tags:${JSON.stringify(filter.tags)};`;
		}

		return placeholder;
	}, [ placeholder, filter, dirty ]);

	useEffect(() => setDirty(JSON.stringify(filter) !== JSON.stringify(filterDefaultValue)), [ filter ]);
	useEffect(() => setDirtyTmp(JSON.stringify(filterTmp) !== JSON.stringify(filterDefaultTmp)), [ filterTmp ]);

	return (
		<Box ref={inputRef}>
			<SearchInput
				value={filter.search}
				onChange={(e) => changeHandler('search', e.target.value)}
				placeholder={getInputPlaceholder()}
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
								title={t('table:filter.clear')}
							/>
						) : (
							<div style={{ width: '28px' }} />
						)}
						<IconButton
							id="data-table-filter-search_button"
							onClick={openHandler}
							aria-controls={open ? 'data-table-filter-search' : undefined}
							aria-expanded={open ? 'true' : undefined}
							aria-haspopup="true"
							title={t('table:filter.options')}
						>
							<TuneIcon fontSize="small" />
						</IconButton>
					</Stack>
				}
				sx={{ width: '300px' }}
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
				<OuterWrapper
					direction="column"
					style={{ width: '35vw' }}
				>
					{typesActive && (
						<RowWrapper>
							<RowLabel htmlFor="data-table-filter_types">
								{t('table:filter.type')}
							</RowLabel>
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
						</RowWrapper>
					)}
					{categoriesActive && (
						<RowWrapper>
							<RowLabel htmlFor="data-table-filter_categories">
								{t('table:filter.categories')}
							</RowLabel>
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
						</RowWrapper>
					)}
					{tagsActive && (
						<RowWrapper>
							<RowLabel htmlFor="data-table-filter_tags">
								{t('table:filter.tags')}
							</RowLabel>
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
						</RowWrapper>
					)}
					<Stack
						direction="row"
						spacing={2}
						justifyContent="flex-end"
						sx={{
							paddingTop: '.5rem',
						}}
					>
						<Button
							size="small"
							onClick={() => {
								closeHandler();
								resetHandler();
							}}
						>
							{t('btn.cancel')}
						</Button>
						<PrimaryButton
							size="small"
							onClick={filterTrigger}
							disabled={!dirtyTmp}
						>
							{t('table:filter.trigger')}
						</PrimaryButton>
					</Stack>
				</OuterWrapper>
			</Menu>
		</Box>
	);
};

export default DataTableFilter;
