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
	FORM_INPUT_MIN_LENGTH,
	LANGUAGE_OPTION_DEFAULT,
} from '../../constants';
import {
	Button,
	IconButton,
	IconButtonClose,
	Checkbox,
	Switch,
	MoreMenu,
	SearchInput,
	Select,
	ConfirmDialog,
} from '../ui';
import {
	orderType,
	columnItemProps,
	TableHeadingProps,
	DataTableProps,
	TableToolbarProps,
} from './types';
import {
	getComparator,
	getTypesFromData,
	getSearchAttrs,
} from './utils';

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
		typesOptions = [],
		selected,
		onToggleSelected,
		onDeleteSelected,
	} = props;

	const [ filter, setFilter ] = useState<{
		search: string;
		type: string;
	}>({
		search: '',
		type: 'all',
	});

	useEffect(() => {
		onFilterChange(filter);
	}, [ filter ]);

	return (
		<div style={{ padding: '1rem' }}>
			<Stack
				spacing={2}
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				width="100%"
			>
				<Stack
					spacing={2}
					direction="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<div>
						<SearchInput
							value={filter.search}
							onChange={(e) => {
								setFilter({
									...filter,
									search: e.target.value,
								});
							}}
							inputType="text"
							placeholder={t('table:filter.search')}
							style={{ width: '200px' }}
						/>
					</div>
					<div>
						<Select
							options={typesOptions}
							value={filter.type}
							onChange={(e) => {
								setFilter({
									...filter,
									type: e.target.value as string,
								});
							}}
							placeholder={t('table:filter.type')}
							style={{ width: '150px' }}
						/>
					</div>
					<div>
						<IconButtonClose
							size="small"
							aria-label={t('table:filter.clear')}
							disabled={(
								filter.search === ''
								&& filter.type === 'all'
							)}
							onClick={() => {
								setFilter({
									search: '',
									type: 'all',
								});
							}}
						/>
					</div>
				</Stack>
				<div>
					<ButtonGroup
						variant="outlined"
						color="secondary"
						aria-label="outlined primary button group"
					>
						<Button
							disabled={selected.length === 0}
							onClick={() => onToggleSelected()}
						>
							{t('table:selected.toggle')} {selected.length}
						</Button>
						<Button
							disabled={selected.length === 0}
							onClick={() => onDeleteSelected()}
						>
							{t('table:selected.delete')} {selected.length}
						</Button>
					</ButtonGroup>
				</div>
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
		defaultOrder = 'desc',
		defaultOrderBy = 'id',
		onDetail,
		onToggle,
		onDelete,
		searchProps = [],
	} = props;

	const rowPadding = 'normal';

	const [ order, setOrder ] = useState<orderType>(defaultOrder);
	const [ orderBy, setOrderBy ] = useState<keyof string | number | any>(defaultOrderBy);
	const [ selected, setSelected ] = useState<readonly number[]>([]);
	const [ page, setPage ] = useState<number>(0);
	const [ rowsPerPage, setRowsPerPage ] = useState<number>(5);
	const [ filter, setFilter ] = useState<{
		search: string;
		type: string;
	}>({
		search: '',
		type: 'all',
	});
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
	const toggleCallback = (id: number[]) => {
		onToggle(id); // TODO: as Promise
		setSelected([]);
	};
	const deleteCallback = (id: number[]) => {
		setConfirmData([...id]);
		setConfirmOpen(true);
	};
	const deleteCallbackConfirm = () => {
		onDelete(confirmData); // TODO: as Promise
		setSelected([]);
		setConfirmData([]);
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
	const getTypesOptions = useCallback(() => {
		const tmp = getTypesFromData(rows);
		const options = [
			{
				key: 'all',
				value: 'all',
				label: 'All',
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
	const getFilteredItems = useCallback(() => {
		let items = [
			...rows,
		];
		if (filter.search !== '' && filter.search.length > FORM_INPUT_MIN_LENGTH) {
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
	const getEmptyRows = useCallback(() => {
		return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - getFilteredItems().length) : 0;
	}, [ page, rows, filter ]);

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
						onFilterChange={setFilter}
						typesOptions={getTypesOptions()}
						selected={selected}
						onToggleSelected={() => toggleCallback([...selected])}
						onDeleteSelected={() => deleteCallback([...selected])}
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
																label: 'Detail',
																onClick: () => detailCallback(row.id),
															},
															{
																key: 'toggle',
																label: 'Toggle',
																onClick: () => toggleCallback([row.id]),
															},
															{
																key: 'delete',
																label: 'Delete',
																onClick: () => deleteCallback([row.id]),
															},
														]}
													/>
												</TableCell>
											</TableRow>
										);
									})}
								{getEmptyRows() > 0 && (
									<TableRow
										style={{
											height: 53 * getEmptyRows(),
										}}
									>
										<TableCell colSpan={6} />
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={getFilteredItems().length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Paper>
			</Box>
			<ConfirmDialog
				context="delete"
				open={confirmOpen}
				onClose={() => setConfirmOpen(false)}
				confirmData={confirmData}
				onConfirm={() => deleteCallbackConfirm()}
			/>
		</>
	);
};

export default DataTable;
