import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
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

import IconButton from '../Button/IconButton';
import Checkbox from '../Checkbox/Checkbox';

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
export interface EnhancedTableProps {
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

const EnhancedTableHead = (props: EnhancedTableProps) => {
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
						{key}
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
					/>
				</TableCell>
				{renderCells()}
				<TableCell
					align="right"
					padding="normal"
				>
					Actions
				</TableCell>
			</TableRow>
		</TableHead>
	);
}

const DataTable = (props: DataTableProps) => {
	const {
		rows = [],
		columns = {},
	} = props;

	const [ order, setOrder ] = useState<orderType>('desc');
	const [ orderBy, setOrderBy ] = useState<keyof string | number | any>('id');
	const [ selected, setSelected ] = useState<readonly number[]>([]);
	const [ page, setPage ] = useState(0);
	const [ rowsPerPage, setRowsPerPage ] = useState(5);

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
	const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
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

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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
				<>{row.email}</>
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
				<>{row.active ? 'yes' : 'no'}</>
			),
		});

		return cols;
	}, [ columns ]);

	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', mb: 2 }}>
				<TableContainer>
					<Table
						sx={{ minWidth: 750 }}
						aria-labelledby="tableTitle"
					>
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
							cells={columns}
						/>
						<TableBody>
							{rows.slice().sort(getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const isItemSelected = isSelected(row.id);
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<TableRow
											hover
											onClick={(event) => handleClick(event, row.id)}
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
												/>
											</TableCell>
											{getColumns(row).map((cell) => (
												<TableCell
													key={cell.id}
													align={cell.align}
													component={cell.component}
													width={cell.width}
													scope={cell.scope ? 'row' : null}
													padding="normal"
												>
													{cell.children}
												</TableCell>
											))}
											<TableCell
												align="right"
												padding="normal"
											>
												action buttons ...
											</TableCell>
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: 53 * emptyRows,
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
					count={rows.length}
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
