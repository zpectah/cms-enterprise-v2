import React from 'react';

export type orderType = 'asc' | 'desc';

export type cellAlignType = 'left' | 'center' | 'right';

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
	searchProps?: string[];
}

export interface TableToolbarProps {
	onFilterChange: (filter: {
		search: string;
		type: string;
	}) => void;
	typesOptions: any[];
	selected: readonly number[];
	onToggleSelected: () => void;
	onDeleteSelected: () => void;
}
