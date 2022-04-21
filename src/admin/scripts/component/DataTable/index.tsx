import React, { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import {
	styled,
	Box,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TablePagination,
	TableRow,
	Paper,
	Chip,
	Typography,
	CircularProgress,
} from '@mui/material';

import { array } from '../../../../../utils/helpers';
import {
	DATA_TABLE,
	FORM_INPUT_MIN_LENGTH,
	LANGUAGE_OPTION_DEFAULT,
} from '../../constants';
import useProfile from '../../hooks/useProfile';
import {
	useCategories,
	useTags,
} from '../../hooks/model';
import {
	Checkbox,
	Switch,
	MoreMenu,
	ConfirmDialog,
} from '../ui';
import {
	orderType,
	columnItemProps,
	filterProps,
	DataTableProps,
} from './types';
import {
	getComparator,
	getTypesFromData,
	getCategoriesFromData,
	getTagsFromData,
	getSearchAttrs,
	filterDefaultValue,
} from './utils';
import InfoRowCell from './InfoRowCell';
import TableToolbar from './TableToolbar';
import TableHeading from './TableHeading';
import ExportDialog from '../ExportDialog';

const RowItemSmall = styled('small')`
	opacity: .75;
`;
const RowItemSpan = styled('span')``;
const RowItemLink = styled('a')`
	font-weight: bold;
	cursor: pointer;
`;

const DataTable = (props: DataTableProps) => {
	const {
		id,
		rows = [],
		columns = {},
		defaultOrder = DATA_TABLE.sortDefault as orderType,
		defaultOrderBy = 'id',
		onDetail,
		onReplicate,
		onToggle,
		onDelete,
		// onExport,
		afterExport,
		searchProps = [],
		rowToggleActive = true,
		rowDeleteActive = true,
		loading,
		model,
	} = props;

	const tableElement = useRef();
	const { t } = useTranslation([ 'table', 'types' ]);
	const { categories } = useCategories();
	const { tags } = useTags();
	const {
		profile,
		available_actions,
		compareUserForUpdate,
		compareUserForDelete,
	} = useProfile();
	const [ order, setOrder ] = useState<orderType>(defaultOrder);
	const [ orderBy, setOrderBy ] = useState<keyof string | number | any>(defaultOrderBy);
	const [ selected, setSelected ] = useState<readonly number[]>([]);
	const [ page, setPage ] = useState<number>(0);
	const [ rowsPerPage, setRowsPerPage ] = useState<number>(DATA_TABLE.rowsDefault);
	const [ filter, setFilter ] = useState<filterProps>(filterDefaultValue);
	const [ confirmOpen, setConfirmOpen ] = useState<boolean>(false);
	const [ confirmData, setConfirmData ] = useState<number[]>([]);
	const [ exportOpen, setExportOpen ] = useState<boolean>(false);
	const [ innerState, setInnerState ] = useState({
		filterDirty: false,
		itemsCount: 0,
		itemsLoaded: false,
		itemsFound: 0,
		rowsCount: 0,
		columnsCount: 0,
	});

	const rowPadding = 'normal';
	const actions = available_actions[model];
	const replicateOptions = !!onReplicate;

	const getColumnsCount = () => {
		const root: any = tableElement.current;
		const heading = root?.querySelector('thead');
		const row = heading?.querySelector('tr');
		const cols = row?.querySelectorAll('th');

		return cols.length;
	};
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

	const replicateCallback = (id: number) => {
		if (replicateOptions && actions.create) onReplicate(id);
	};
	const detailCallback = (id: number) => {
		if (actions.update) onDetail(id);
	};
	const toggleCallback = (ids: number[]) => {
		const master = [ ...ids ];
		if (actions.update) onToggle(master).then((resp) => {
			setSelected([]);
		});
	};
	const deleteCallback = () => {
		const master = [ ...confirmData ];
		if (actions.delete) onDelete(master).then((resp) => {
			setConfirmOpen(false);
			setConfirmData([]);
			setSelected([]);
		});
	};
	const deleteConfirm = (ids: number[]) => {
		if (actions.delete) {
			setConfirmData([...ids]);
			setConfirmOpen(true);
		}
	};
	const exportCallback = (response: unknown) => {
		if (afterExport) afterExport(response);
	};
	const exportConfirm = (ids: number[]) => {
		setConfirmData([...ids]);
		setExportOpen(true);
	};

	const userCanUpdate = useMemo(() => {
		return actions.update;
	}, [ profile, available_actions ]);
	const userCanDelete = useMemo(() => {
		return actions.delete;
	}, [ profile, available_actions ]);

	const getColumns = useCallback((row: any) => {
		const cols: columnItemProps[] = [];
		let canUpdate = userCanUpdate;
		if (model === 'Users') canUpdate = compareUserForUpdate(row);

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
					onClick={() => {
						if (canUpdate) detailCallback(row.id);
					}}
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
					onClick={() => {
						if (canUpdate) detailCallback(row.id);
					}}
				>
					{row.name}
				</RowItemLink>
			),
		});
		if (columns.subject) cols.push({
			id: 'subject',
			component: 'th',
			align: columns.subject[0],
			width: columns.subject[1],
			scope: true,
			children: (
				<RowItemLink
					onClick={() => {
						if (canUpdate) detailCallback(row.id);
					}}
				>
					{row.subject}
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
					label={t(`types:${row.type}`)}
					color="info"
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
					disabled={!canUpdate}
				/>
			),
		});

		return cols;
	}, [ columns ]);
	const getRows = useCallback(() => {
		let items = [ ...rows ];
		// Filter by search
		if (filter.search !== '' && filter.search.length >= FORM_INPUT_MIN_LENGTH) {
			items = array.search(
				rows,
				getSearchAttrs(searchProps, LANGUAGE_OPTION_DEFAULT),
				filter.search,
			);
		}
		// Filter by type
		if (filter.type !== 'all') {
			let tmp = [];
			items.map((item) => {
				if (item.type == filter.type) tmp.push(item);
			});
			items = tmp;
		}
		// Filter by categories
		if (filter.categories.length > 0) {
			let tmp = [];
			items.map((item) => {
				const presents = _.intersectionWith(item.categories, filter.categories, _.isEqual);
				if (presents.length > 0) tmp.push(item);
			});
			items = tmp;
		}
		// Filter by tags
		if (filter.tags.length > 0) {
			let tmp = [];
			items.map((item) => {
				const presents = _.intersectionWith(item.tags, filter.tags, _.isEqual);
				if (presents.length > 0) tmp.push(item);
			});
			items = tmp;
		}

		// Paginating and orders
		return items.slice().sort(getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
	}, [ rows, filter, order, orderBy, page, rowsPerPage ]);
	const getActionsOptions = useCallback((row: any, canUpdate: boolean, canDelete: boolean) => {
		const options = [];
		if (canUpdate) {
			if (onDetail) options.push({
				key: 'detail',
				label: t('table:row.menu.detail'),
				onClick: () => detailCallback(row.id),
				hidden: !canUpdate,
			});
			if (onToggle) options.push({
				key: 'toggle',
				label: t('table:row.menu.toggle'),
				onClick: () => toggleCallback([row.id]),
				disabled: !rowToggleActive,
				hidden: !canUpdate,
			});
		}
		if (canDelete) {
			if (onDelete) options.push({
				key: 'delete',
				label: t('table:row.menu.delete'),
				onClick: () => deleteConfirm([row.id]),
				disabled: !rowDeleteActive,
				hidden: !canDelete,
			});
		}
		if (replicateOptions && actions.create) {
			options.push({
				key: 'replicate',
				label: t('table:row.menu.replicate'),
				onClick: () => replicateCallback(row.id),
				disabled: !row.template,
			});
		}

		return options;
	}, [ actions, replicateOptions ]);

	const options_types = useMemo(() => {
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
	const options_categories = useMemo(() => {
		const tmp = getCategoriesFromData(rows);
		const options = [];
		if (tmp.length > 0 && categories) {
			tmp.map((ctgId) => {
				const id = ctgId;
				const category = categories?.find((item) => item.id === id);
				options.push({
					key: `category_${id}`,
					label: category.name,
					value: id,
				});
			});
		}

		return options;
	}, [ rows, categories ]);
	const options_tags = useMemo(() => {
		const tmp = getTagsFromData(rows);
		const options = [];
		if (tmp.length > 0 && tags) {
			tmp.map((tagId) => {
				const id = tagId;
				const tag = tags?.find((item) => item.id === id);
				options.push({
					key: `tag_${id}`,
					label: tag.name,
					value: id,
				});
			});
		}

		return options;
	}, [ rows, tags ]);

	useEffect(() => {
		getColumnsCount();
		setInnerState({
			...innerState,
			itemsCount: rows.length,
			itemsLoaded: !!rows,
			filterDirty: JSON.stringify(filter) !== JSON.stringify(filterDefaultValue),
			rowsCount: getRows().length,
			columnsCount: getColumnsCount(),
		});
	}, [ rows, filter, columns ]);

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
						onExportSelected={() => exportConfirm([...selected])}
						optionsType={options_types}
						optionsCategories={options_categories}
						optionsTags={options_tags}
						actions={actions}
						model={model}
					/>
					<Divider />
					<TableContainer>
						<Table
							id={id}
							sx={{ minWidth: 750 }}
							ref={tableElement}
						>
							<TableHeading
								numSelected={selected.length}
								order={order}
								orderBy={orderBy}
								onSelectAllClick={handleSelectAllClick}
								onRequestSort={handleRequestSort}
								rowCount={innerState.rowsCount}
								cells={columns}
							/>
							{loading && (
								<InfoRowCell colspan={innerState.columnsCount}>
									<CircularProgress size={24}/>
									<Typography variant="caption">
										{t('table:row.info.loading')}
									</Typography>
								</InfoRowCell>
							)}
							{(innerState.itemsLoaded && innerState.itemsCount === 0) && (
								<InfoRowCell colspan={innerState.columnsCount}>
									<Typography variant="caption">
										{t('table:row.info.no_items')}
									</Typography>
								</InfoRowCell>
							)}
							{(innerState.itemsLoaded
								&& innerState.itemsCount > 0
								&& innerState.filterDirty
								&& innerState.rowsCount === 0
							) && (
								<InfoRowCell colspan={innerState.columnsCount}>
									<Typography variant="caption">
										{t('table:row.info.not_found')}
									</Typography>
								</InfoRowCell>
							)}
							<TableBody>
								{getRows().map((row, index) => {
										const isItemSelected = isSelected(row.id);
										const labelId = `${id}_checkbox_${index}`;
										let canUpdate = userCanUpdate;
										let canDelete = userCanDelete;
										if (model === 'Users') {
											canUpdate = compareUserForUpdate(row);
											canDelete = compareUserForDelete(row);
										}
										const actionsOptions = getActionsOptions(row, canUpdate, canDelete);

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
														options={actionsOptions}
														disabled={actionsOptions.length === 0}
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
						count={innerState.itemsCount}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
						labelRowsPerPage={t('table:options.rowsPerPage')}
						labelDisplayedRows={({ from, to, count }) => `${from} - ${to} / ${count}`}
					/>
				</Paper>
			</Box>
			<ExportDialog
				model={model}
				open={exportOpen}
				onClose={() => setExportOpen(false)}
				dataToExport={confirmData}
				afterExport={exportCallback}
			/>
			<ConfirmDialog
				context="delete"
				open={confirmOpen}
				onClose={() => setConfirmOpen(false)}
				confirmData={confirmData}
				onConfirm={deleteCallback}
			/>
		</>
	);
};

export default DataTable;
