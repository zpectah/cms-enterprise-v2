import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	Box,
	Stack,
	Divider,
	Paper,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { array } from '../../../../../utils/helpers';
import { VisitorBlacklistItemProps } from '../../types/model';
import { getComparator } from '../../component/DataTable/utils';
import { orderType } from '../../component/DataTable/types';
import { DATA_TABLE } from '../../constants';
import {
	AddButton,
	SearchInput,
	IconButton,
} from '../../component/ui';

export interface VisitorBlacklistListProps {
	rows: VisitorBlacklistItemProps[];
	onDetail: (id: number | 'new') => void;
	onDelete: (id: number) => void;
}

const VisitorBlacklistList = (props: VisitorBlacklistListProps) => {
	const {
		rows = [],
		onDetail,
		onDelete,
	} = props;

	const { t } = useTranslation([ 'table', 'components' ]);
	const [ search, setSearch ] = useState('');
	const [ order, setOrder ] = useState<orderType>('asc');
	const [ orderBy, setOrderBy ] = useState<keyof string | number | any>('id');
	const [ page, setPage ] = useState<number>(0);
	const [ rowsPerPage, setRowsPerPage ] = useState<number>(DATA_TABLE.rowsDefault);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof any,
	) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const getRows = useCallback(() => {
		let items = rows || [];
		if (search.length > 3) {
			items = array.search(
				rows,
				[ 'visitor_email', 'visitor_ip', 'cause', 'description' ],
				search,
			);
		}

		return items.slice().sort(getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
	}, [ rows, search, order, orderBy ]);

	return (
		<>
			<Box>
				<Paper
					sx={{
						width: '100%',
						mb: 2,
					}}
				>
					<Stack
						sx={{ p: '1rem' }}
						direction="row"
						alignItems="center"
						justifyContent="space-between"
						spacing={2}
					>
						<div>
							<SearchInput
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder={t('components:VisitorBlacklistList.search_placeholder')}
								disabled={rows.length === 0}
								sx={{
									width: '30vw',
								}}
							/>
						</div>
						<div>
							<AddButton
								label={t('components:VisitorBlacklistList.button_add')}
								onClick={() => onDetail('new')}
								variant="outlined"
							/>
						</div>
					</Stack>
					<Divider />
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell
										width="100px"
										sortDirection={orderBy === 'id' ? order : false}
									>
										<TableSortLabel
											active={orderBy === 'id'}
											direction={orderBy === 'id' ? order : 'asc'}
											onClick={(e) => handleRequestSort(e, 'id')}
										>
											{t('table:label.id')}
											{orderBy === 'id' ? (
												<Box component="span" sx={visuallyHidden}>
													{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
												</Box>
											) : null}
										</TableSortLabel>
									</TableCell>
									<TableCell
										width="250px"
										sortDirection={orderBy === 'visitor_ip' ? order : false}
									>
										<TableSortLabel
											active={orderBy === 'visitor_ip'}
											direction={orderBy === 'visitor_ip' ? order : 'asc'}
											onClick={(e) => handleRequestSort(e, 'visitor_ip')}
										>
											{t('table:label.ip')}
											{orderBy === 'visitor_ip' ? (
												<Box component="span" sx={visuallyHidden}>
													{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
												</Box>
											) : null}
										</TableSortLabel>
									</TableCell>
									<TableCell
										width="auto"
										sortDirection={orderBy === 'visitor_email' ? order : false}
									>
										<TableSortLabel
											active={orderBy === 'visitor_email'}
											direction={orderBy === 'visitor_email' ? order : 'asc'}
											onClick={(e) => handleRequestSort(e, 'visitor_email')}
										>
											{t('table:label.email')}
											{orderBy === 'visitor_email' ? (
												<Box component="span" sx={visuallyHidden}>
													{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
												</Box>
											) : null}
										</TableSortLabel>
									</TableCell>
									<TableCell
										width="auto"
										align="right"
									>
										{t('table:label.actions')}
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{getRows().map((row) => {

									return (
										<TableRow
											key={row.id}
										>
											<TableCell>
												{row.id}
											</TableCell>
											<TableCell>
												{row.visitor_ip}
											</TableCell>
											<TableCell>
												{row.visitor_email}
											</TableCell>
											<TableCell
												align="right"
											>
												<Stack
													direction="row"
													spacing={2}
													justifyContent="flex-end"
												>
													<IconButton
														size="small"
														onClick={() => onDetail(row.id)}
													>
														<EditIcon />
													</IconButton>
													<IconButton
														size="small"
														onClick={() => onDelete(row.id as number)}
													>
														<DeleteOutlineIcon />
													</IconButton>
												</Stack>

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
						count={getRows().length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Paper>
			</Box>
		</>
	);
};

export default VisitorBlacklistList;
