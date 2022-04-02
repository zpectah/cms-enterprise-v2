import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from '../../routes';
import { MenuItemProps } from '../../types/model';
import { entityActionsType } from '../../types/common';
import PageHeading from '../../component/PageHeading';
import DataTable from '../../component/DataTable';
import { BarPreloader } from '../../component/ui';

interface MenuListProps {
	dataItems: MenuItemProps[];
	onToggle: (master: number[]) => Promise<unknown>;
	onDelete: (master: number[]) => Promise<unknown>;
	loading: boolean;
	actions: entityActionsType;
}

const MenuList = (props: MenuListProps) => {
	const {
		dataItems = [],
		onToggle,
		onDelete,
		loading,
		actions,
	} = props;

	const tableOptions = {
		id: 'MenuDataTable',
		root: `/admin/app/${routes.menu.path}`,
	};

	const { t } = useTranslation([ 'common', 'pages' ]);
	const navigate = useNavigate();

	return (
		<>
			<PageHeading
				title={t(`pages:menu.page_title`)}
				createButtonLabel={t('model_new.Menu')}
				createButtonPath={`${tableOptions.root}/detail/new`}
			/>
			{loading && <BarPreloader />}
			<DataTable
				model="Menu"
				id={tableOptions.id}
				rows={dataItems}
				columns={{
					id: ['center', '100px'],
					name: ['left', 'auto'],
					type: ['left', '150px'],
					active: ['right', '125px'],
				}}
				searchProps={[
					'name',
					'lang.[lang].label',
				]}
				onDetail={(id) => navigate(`${tableOptions.root}/detail/${id}`)}
				onToggle={onToggle}
				onDelete={onDelete}
				loading={loading}
				actions={actions}
			/>
		</>
	);
};

export default MenuList;
