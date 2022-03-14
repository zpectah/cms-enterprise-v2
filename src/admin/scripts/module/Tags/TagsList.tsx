import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from '../../routes';
import { TagsItemProps } from '../../types/model';
import PageHeading from '../../component/PageHeading';
import DataTable from '../../component/DataTable';
import { BarPreloader } from '../../component/ui';

interface TagsListProps {
	dataItems: TagsItemProps[];
	onToggle: (master: number[]) => Promise<unknown>;
	onDelete: (master: number[]) => Promise<unknown>;
	loading: boolean;
}

const TagsList = (props: TagsListProps) => {
	const {
		dataItems = [],
		onToggle,
		onDelete,
		loading,
	} = props;

	const tableOptions = {
		id: 'TagsDataTable',
		root: `/admin/app/${routes.tags.path}`,
	};

	const { t } = useTranslation(['common', 'pages']);
	const navigate = useNavigate();

	return (
		<>
			<PageHeading
				title={t(`pages:tags.page_title`)}
				createButtonLabel={t('model_new.Tags')}
				createButtonPath={`${tableOptions.root}/detail/new`}
			/>
			{loading && <BarPreloader />}
			<DataTable
				model="Tags"
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
				]}
				onDetail={(id) => navigate(`${tableOptions.root}/detail/${id}`)}
				onToggle={onToggle}
				onDelete={onDelete}
				loading={loading}
			/>
		</>
	);
};

export default TagsList;
