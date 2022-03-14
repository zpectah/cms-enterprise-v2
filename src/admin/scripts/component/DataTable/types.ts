import React from 'react';

import { appModel } from '../../types/app';

export type orderType = 'asc' | 'desc';

export type cellAlignType = 'left' | 'center' | 'right';

export type filterProps = {
	search: string;
	type: string;
	categories?: (number | string)[],
	tags?: (number | string)[],
};

export type optionsItemProps = {
	key: number | string,
	value: number | string,
	label: string,
	disabled?: boolean,
};

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
	id: string;
	rows: any[];
	columns: {
		[k: string]: [cellAlignType, string],
	};
	defaultOrder?: orderType;
	defaultOrderBy?: string;
	onDetail: (id: number) => void;
	onToggle: (ids: number[]) => Promise<unknown>;
	onDelete: (ids: number[]) => Promise<unknown>;
	onExport?: (ids: number[]) => Promise<unknown>;
	searchProps?: string[];
	rowToggleActive?: boolean;
	rowDeleteActive?: boolean;
	loading?: boolean;
	model: appModel;
}

export interface TableToolbarProps {
	onFilterChange: (filter: filterProps) => void;
	optionsType?: optionsItemProps[];
	optionsCategories?: optionsItemProps[];
	optionsTags?: optionsItemProps[];
	selected: readonly number[];
	onToggleSelected?: () => void;
	onDeleteSelected?: () => void;
	onExportSelected?: () => void;
}
