import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from '../../routes';
import { PostsItemProps } from '../../types/model';
import { entityActionsType } from '../../types/common';
import PageHeading from '../../component/PageHeading';
import DataTable from '../../component/DataTable';
import { BarPreloader } from '../../component/ui';

interface PostsListProps {
	dataItems: PostsItemProps[];
	onToggle: (master: number[]) => Promise<unknown>;
	onDelete: (master: number[]) => Promise<unknown>;
	loading: boolean;
	actions: entityActionsType;
}

const PostsList = (props: PostsListProps) => {
	const {
		dataItems = [],
		onToggle,
		onDelete,
		loading,
		actions,
	} = props;

	const tableOptions = {
		id: 'PostsDataTable',
		root: `/admin/app/${routes.posts.path}`,
	};

	const { t } = useTranslation(['common', 'pages']);
	const navigate = useNavigate();

	return (
		<>
			<PageHeading
				title={t(`pages:posts.page_title`)}
				createButtonLabel={t('model_new.Posts')}
				createButtonPath={`${tableOptions.root}/detail/new`}
			/>
			{loading && <BarPreloader />}
			<DataTable
				model="Posts"
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
				onReplicate={(id) => navigate(`${tableOptions.root}/detail/new?replica=${id}`)}
				onToggle={onToggle}
				onDelete={onDelete}
				loading={loading}
				actions={actions}
			/>
		</>
	);
};

export default PostsList;
