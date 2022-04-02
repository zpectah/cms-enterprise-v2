import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from '../../routes';
import { CategoriesItemProps } from '../../types/model';
import { entityActionsType } from '../../types/common';
import PageHeading from '../../component/PageHeading';
import DataTable from '../../component/DataTable';
import { BarPreloader } from '../../component/ui';

interface CategoriesListProps {
	dataItems: CategoriesItemProps[];
	onToggle: (master: number[]) => Promise<unknown>;
	onDelete: (master: number[]) => Promise<unknown>;
	loading: boolean;
	actions: entityActionsType;
}

const CategoriesList = (props: CategoriesListProps) => {
	const {
		dataItems = [],
		onToggle,
		onDelete,
		loading,
		actions,
	} = props;

	const tableOptions = {
		id: 'CategoriesDataTable',
		root: `/admin/app/${routes.categories.path}`,
	};

	const { t } = useTranslation(['common', 'pages']);
	const navigate = useNavigate();

	return (
		<>
			<PageHeading
				title={t(`pages:categories.page_title`)}
				createButtonLabel={t('model_new.Categories')}
				createButtonPath={`${tableOptions.root}/detail/new`}
			/>
			{loading && <BarPreloader />}
			<DataTable
				model="Categories"
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
					'lang.[lang].title',
					'lang.[lang].description',
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

export default CategoriesList;
