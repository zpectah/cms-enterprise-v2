import React, { useCallback, useState } from 'react';
import {
	Box,
	Stack,
	Divider,
	ButtonGroup,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { useTranslation } from 'react-i18next';

import { array } from '../../../../../../utils/helpers';
import {
	FORM_INPUT_MIN_LENGTH,
	LANGUAGE_OPTION_DEFAULT,
} from '../../../constants';
import { Button, IconButton, IconButtonClose } from '../Button';
import { Checkbox } from '../Checkbox';
import { Switch } from '../Switch';
import { MoreMenu } from '../Menu';
import { SearchInput } from '../Input';
import { Select } from '../Select';

type orderType = 'asc' | 'desc';
type cellAlignType = 'left' | 'center' | 'right';

export interface columnItemProps {
	id: string,
	component: 'th' | 'td',
	align: cellAlignType,
	width: string,
	scope?: boolean,
	children: React.ReactNode,
}
export interface TableHeadingProps {
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, property: keyof any) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: orderType;
	orderBy: string;
	rowCount: number;
	cells: DataTableProps['columns'];
}
export interface DataTableProps {
	rows: any[];
	columns: {
		[k: string]: [cellAlignType, string],
	};
	defaultOrder?: orderType;
	defaultOrderBy?: string;
	onDetail: (id: number) => void;
	onToggle: (id: number) => void;
	onDelete: (id: number) => void;
	searchProps?: string[];
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator<Key extends keyof any>(
	order: orderType,
	orderBy: Key,
): (
	a: { [key in Key]: number | string },
	b: { [key in Key]: number | string },
) => number {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function getTypesFromData (data: any[]) {
	let list = [];

	data.map((item) => {
		let type = item.type;

		if (list.indexOf(type) < 0) list.push(type);
	});

	return list;
}

function getSearchAttrs (attrs: string[], lang: string) {
	let na = [];

	attrs.map((attr) => {
		let ni = attr.replace('[lang]', lang);
		na.push(ni);
	});

	return na;
}

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
	const { t } = useTranslation(['types']);
	const {
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

	const detailClickCallback = (id: number) => {
		onDetail(id);
	};
	const toggleClickCallback = (id: number) => {
		onToggle(id);
	};
	const deleteClickCallback = (id: number) => {
		onDelete(id);
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
				<small>{row.id}</small>
			),
		});
		if (columns.email) cols.push({
			id: 'email',
			component: 'th',
			align: columns.email[0],
			width: columns.email[1],
			scope: true,
			children: (
				<a
					onClick={() => detailClickCallback(row.id)}
				>
					{row.email}
				</a>
			),
		});
		if (columns.type) cols.push({
			id: 'type',
			component: 'td',
			align: columns.type[0],
			width: columns.type[1],
			children: (
				<>{row.type}</>
			),
		});
		if (columns.active) cols.push({
			id: 'active',
			component: 'td',
			align: columns.active[0],
			width: columns.active[1],
			children: (
				<>
					<Switch
						checked={row.active}
						onChange={() => toggleClickCallback(row.id)}
					/>
				</>
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
		<Box
			sx={{ width: '100%' }}
		>
			<Paper
				sx={{
					width: '100%',
					mb: 2,
				}}
			>
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
									placeholder="Search in table"
									style={{ width: '200px' }}
								/>
							</div>
							<div>
								<Select
									options={getTypesOptions()}
									value={filter.type}
									onChange={(e) => {
										setFilter({
											...filter,
											type: e.target.value as string,
										});
									}}
									placeholder="Select type"
									style={{ width: '150px' }}
								/>
							</div>
							<div>
								<IconButtonClose
									size="small"
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
								>
									Toggle {selected.length}
								</Button>
								<Button
									disabled={selected.length === 0}
								>
									Delete {selected.length}
								</Button>
							</ButtonGroup>
						</div>
					</Stack>
				</div>
				<Divider />
				<TableContainer>
					<Table
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
									const labelId = `enhanced-table-checkbox-${index}`;

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
													id={`row_more_${row.id}`}
													options={[
														{
															key: 'detail',
															label: 'Detail',
															onClick: () => detailClickCallback(row.id),
														},
														{
															key: 'toggle',
															label: 'Toggle',
															onClick: () => toggleClickCallback(row.id),
														},
														{
															key: 'delete',
															label: 'Delete',
															onClick: () => deleteClickCallback(row.id),
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
	);
};

export default DataTable;
