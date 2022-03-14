import React from 'react';
import { useTranslation } from 'react-i18next';
import {
	Box,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import { TableHeadingProps } from './types';
import { Checkbox } from '../ui';

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
};

export default TableHeading;
