import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	styled,
	Box,
	Stack,
	Divider,
	ButtonGroup,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
	Paper,
	Chip,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import { array } from '../../../../../utils/helpers';
import {
	DATA_TABLE,
	FORM_INPUT_MIN_LENGTH,
	LANGUAGE_OPTION_DEFAULT,
} from '../../constants';
import {
	useCategories,
	useTags,
} from '../../hooks/model';
import {
	Button,
	Checkbox,
	Switch,
	MoreMenu,
	DropdownMenu,
	ConfirmDialog,
} from '../ui';
import {
	orderType,
	columnItemProps,
	filterProps,
	TableHeadingProps,
	DataTableProps,
	TableToolbarProps,
} from './types';
import {
	getComparator,
	getTypesFromData,
	getCategoriesFromData,
	getTagsFromData,
	getSearchAttrs,
	filterDefaultValue,
} from './utils';
import DataTableFilter from './DataTableFilter';

const RowItemSmall = styled('small')`
	opacity: .75;
`;
const RowItemSpan = styled('span')``;
const RowItemLink = styled('a')`
	font-weight: bold;
	cursor: pointer;
`;

const TableToolbar = (props: TableToolbarProps) => {
	const { t } = useTranslation(['table']);
	const {
		onFilterChange,
		optionsType = [],
		optionsCategories = [],
		optionsTags = [],
		selected,
		onToggleSelected,
		onDeleteSelected,
	} = props;

	return (
		<div style={{ padding: '1rem' }}>
			<Stack
				spacing={2}
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				width="100%"
			>
				<DataTableFilter
					optionsType={optionsType}
					optionsCategories={optionsCategories}
					optionsTags={optionsTags}
					onFilterChange={onFilterChange}
				/>
				<DropdownMenu
					id="SelectedDropdownOptions"
					renderButton={(renderProps) => (
						<Button
							variant="outlined"
							color="secondary"
							disabled={selected.length === 0}
							{...renderProps}
						>
							{t('table:selected.selected')} {selected.length}
						</Button>
					)}
					options={[
						{
							key: 'toggle_selected',
							label: t('table:selected.toggle'),
							onClick: () => onToggleSelected(),
						},
						{
							key: 'delete_selected',
							label: t('table:selected.delete'),
							onClick: () => onDeleteSelected(),
						},
					]}
				/>
			</Stack>
		</div>
	);
};

const TableHeading = (props: TableHeadingProps) => {
	const { t } = useTranslation([ 'table' ]);
	const {
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort,
		cells,
	} = props;

	const createSortHandler = (property: keyof any) => (event: React.MouseEvent<unknown>) => {
		onRequestSort(event, property);
	};

	const renderCells = () => {
		const list = [];
		for (let key in cells) {
			list.push(
				<TableCell
					key={key}
					align={cells[key][0]}
					width={cells[key][1]}
					padding="normal"
					sortDirection={orderBy === key ? order : false}
				>
					<TableSortLabel
						active={orderBy === key}
						direction={orderBy === key ? order : 'asc'}
						onClick={createSortHandler(key)}
					>
						{t(`table:label.${key}`)}
						{orderBy === key ? (
							<Box component="span" sx={visuallyHidden}>
								{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
							</Box>
						) : null}
					</TableSortLabel>
				</TableCell>
			);
		}

		return list;
	};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox
						color="primary"
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{
							'aria-label': 'select all',
						}}
						size="small"
					/>
				</TableCell>
				{renderCells()}
				<TableCell
					align="right"
					padding="normal"
				>
					{t(`table:label.actions`)}
				</TableCell>
			</TableRow>
		</TableHead>
	);
}

const DataTable = (props: DataTableProps) => {
	const { t } = useTranslation(['table', 'types']);
	const {
		id,
		rows = [],
		columns = {},
		defaultOrder = DATA_TABLE.sortDefault as orderType,
		defaultOrderBy = 'id',
		onDetail,
		onToggle,
		onDelete,
		searchProps = [],
	} = props;

	const rowPadding = 'normal';
	const rowToggleActive = true;
	const rowDeleteActive = true;

	const { categories } = useCategories();
	const { tags } = useTags();
	const [ order, setOrder ] = useState<orderType>(defaultOrder);
	const [ orderBy, setOrderBy ] = useState<keyof string | number | any>(defaultOrderBy);
	const [ selected, setSelected ] = useState<readonly number[]>([]);
	const [ page, setPage ] = useState<number>(0);
	const [ rowsPerPage, setRowsPerPage ] = useState<number>(DATA_TABLE.rowsDefault);
	const [ filter, setFilter ] = useState<filterProps>(filterDefaultValue);
	const [ confirmOpen, setConfirmOpen ] = useState<boolean>(false);
	const [ confirmData, setConfirmData ] = useState<number[]>([]);

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof any,
	) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};
	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const newSelecteds = rows.map((n) => n.id);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};
	const handleClick = (id: number) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected: readonly number[] = [];
		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}
		setSelected(newSelected);
	};
	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	const isSelected = (id: number) => selected.indexOf(id) !== -1;

	const detailCallback = (id: number) => {
		onDetail(id);
	};
	const toggleCallback = (ids: number[]) => {
		const master = [ ...ids ];
		onToggle(master).then((resp) => {
			setSelected([]);
		});
	};
	const deleteCallback = () => {
		const master = [ ...confirmData ];
		onDelete(master).then((resp) => {
			setConfirmOpen(false);
			setConfirmData([]);
			setSelected([]);
		});
	};
	const deleteConfirm = (ids: number[]) => {
		setConfirmData([...ids]);
		setConfirmOpen(true);
	};

	const getColumns = useCallback((row: any) => {
		const cols: columnItemProps[] = [];

		if (columns.id) cols.push({
			id: 'id',
			component: 'th',
			align: columns.id[0],
			width: columns.id[1],
			scope: true,
			children: (
				<RowItemSmall>
					{row.id}
				</RowItemSmall>
			),
		});
		if (columns.email) cols.push({
			id: 'email',
			component: 'th',
			align: columns.email[0],
			width: columns.email[1],
			scope: true,
			children: (
				<RowItemLink
					onClick={() => detailCallback(row.id)}
				>
					{row.email}
				</RowItemLink>
			),
		});
		if (columns.name) cols.push({
			id: 'name',
			component: 'th',
			align: columns.name[0],
			width: columns.name[1],
			scope: true,
			children: (
				<RowItemLink
					onClick={() => detailCallback(row.id)}
				>
					{row.name}
				</RowItemLink>
			),
		});
		if (columns.type) cols.push({
			id: 'type',
			component: 'td',
			align: columns.type[0],
			width: columns.type[1],
			children: (
				<Chip
					label={row.type}
					variant="outlined"
					size="small"
				/>
			),
		});
		if (columns.active) cols.push({
			id: 'active',
			component: 'td',
			align: columns.active[0],
			width: columns.active[1],
			children: (
				<Switch
					checked={row.active}
					onChange={() => toggleCallback([row.id])}
				/>
			),
		});

		return cols;
	}, [ columns ]);
	const getFilteredItems = useCallback(() => {
		let items = [
			...rows,
		];
		if (filter.search !== '' && filter.search.length >= FORM_INPUT_MIN_LENGTH) {
			items = array.search(
				rows,
				getSearchAttrs(searchProps, LANGUAGE_OPTION_DEFAULT),
				filter.search,
			);
		}
		if (filter.type !== 'all') {
			let tmp = [];
			items.map((item) => {
				if (item.type == filter.type) tmp.push(item);
			});
			items = tmp;
		}

		return items;
	}, [ rows, filter ]);
	const getTypesOptions = useCallback(() => {
		const tmp = getTypesFromData(rows);
		const options = [
			{
				key: 'all',
				label: t(`types:all`),
				value: 'all',
			}
		];

		tmp.map((type) => {
			options.push({
				key: type,
				label: t(`types:${type}`),
				value: type,
			});
		});

		return options;
	}, [ rows ]);
	const getCategoriesOptions = useCallback(() => {
		const tmp = getCategoriesFromData(rows);
		const options = [];
		if (tmp.length > 0) {
			tmp.map((ctgId) => {
				const id = ctgId;
				const category = categories.find((item) => item.id === id);
				options.push({
					key: `category_${id}`,
					label: category.name,
					value: id,
				});
			});
		}

		return options;
	}, [ rows, categories ]);
	const getTagsOptions = useCallback(() => {
		const tmp = getTagsFromData(rows);
		const options = [];
		if (tmp.length > 0) {
			tmp.map((tagId) => {
				const id = tagId;
				const tag = tags.find((item) => item.id === id);
				options.push({
					key: `tag_${id}`,
					label: tag.name,
					value: id,
				});
			});
		}

		return options;
	}, [ rows, tags ]);

	return (
		<>
			<Box
				sx={{ width: '100%' }}
			>
				<Paper
					sx={{
						width: '100%',
						mb: 2,
					}}
				>
					<TableToolbar
						onFilterChange={(filter) => setFilter(filter)}
						selected={selected}
						onToggleSelected={() => toggleCallback([...selected])}
						onDeleteSelected={() => deleteConfirm([...selected])}
						optionsType={getTypesOptions()}
						optionsCategories={getCategoriesOptions()}
						optionsTags={getTagsOptions()}
					/>
					<Divider />
					<TableContainer>
						<Table
							id={id}
							sx={{ minWidth: 750 }}
						>
							<TableHeading
								numSelected={selected.length}
								order={order}
								orderBy={orderBy}
								onSelectAllClick={handleSelectAllClick}
								onRequestSort={handleRequestSort}
								rowCount={getFilteredItems().length}
								cells={columns}
							/>
							<TableBody>
								{getFilteredItems().slice().sort(getComparator(order, orderBy))
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row, index) => {
										const isItemSelected = isSelected(row.id);
										const labelId = `${id}_checkbox_${index}`;

										return (
											<TableRow
												hover
												onDoubleClick={(event) => handleClick(row.id)}
												role="checkbox"
												aria-checked={isItemSelected}
												tabIndex={-1}
												key={row.id}
												selected={isItemSelected}
											>
												<TableCell padding="checkbox">
													<Checkbox
														color="primary"
														checked={isItemSelected}
														inputProps={{
															'aria-labelledby': labelId,
														}}
														size="small"
														onChange={(event) => handleClick(row.id)}
													/>
												</TableCell>

												{getColumns(row).map((cell) => (
													<TableCell
														key={cell.id}
														align={cell.align}
														component={cell.component}
														width={cell.width}
														scope={cell.scope ? 'row' : null}
														padding={rowPadding}
													>
														{cell.children}
													</TableCell>
												))}

												<TableCell
													align="right"
													padding={rowPadding}
												>
													<MoreMenu
														id={`${id}_rowMore_${row.id}`}
														options={[
															{
																key: 'detail',
																label: t('table:row.menu.detail'),
																onClick: () => detailCallback(row.id),
															},
															{
																key: 'toggle',
																label: t('table:row.menu.toggle'),
																onClick: () => toggleCallback([row.id]),
																disabled: !rowToggleActive,
															},
															{
																key: 'delete',
																label: t('table:row.menu.delete'),
																onClick: () => deleteConfirm([row.id]),
																disabled: !rowDeleteActive,
															},
														]}
													/>
												</TableCell>
											</TableRow>
										);
									})}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={DATA_TABLE.rowsPerPage}
						component="div"
						count={getFilteredItems().length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
						labelRowsPerPage={t('table:options.rowsPerPage')}
						labelDisplayedRows={({ from, to, count }) => `${from} - ${to} / ${count}`}
					/>
				</Paper>
			</Box>
			<ConfirmDialog
				context="delete"
				open={confirmOpen}
				onClose={() => setConfirmOpen(false)}
				confirmData={confirmData}
				onConfirm={() => deleteCallback()}
			/>
		</>
	);
};

export default DataTable;
