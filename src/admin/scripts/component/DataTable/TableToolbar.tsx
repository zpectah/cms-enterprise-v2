import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Stack } from '@mui/material';

import config from '../../config';
import { TableToolbarProps } from './types';
import { Button, DropdownMenu } from '../ui';
import TableFilter from './TableFilter';

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
		onExportSelected,
		actions,
		model,
	} = props;

	const options_menu = useMemo(() => {
		const tmp = [];
		if (onToggleSelected && actions.update) {
			if (model === 'Users') {
				if (actions.delete) tmp.push({
					key: 'toggle_selected',
					label: t('table:selected.toggle'),
					onClick: () => onToggleSelected(),
				});
			} else {
				tmp.push({
					key: 'toggle_selected',
					label: t('table:selected.toggle'),
					onClick: () => onToggleSelected(),
				});
			}
		}
		if (onDeleteSelected && actions.delete) {
			tmp.push({
				key: 'delete_selected',
				label: t('table:selected.delete'),
				onClick: () => onDeleteSelected(),
			});
		}
		if (
			onExportSelected
			&& config.project.extras.TABLE_EXPORT_GLOBAL
			&& actions.view
		) tmp.push({
			key: 'export_selected',
			label: t('table:selected.export'),
			onClick: () => onExportSelected(),
		});

		return tmp;
	}, [
		onToggleSelected,
		onDeleteSelected,
		onExportSelected,
	]);

	return (
		<div style={{ padding: '1rem' }}>
			<Stack
				spacing={2}
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				width="100%"
			>
				<TableFilter
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
					options={options_menu}
				/>
			</Stack>
		</div>
	);
};

export default TableToolbar;
