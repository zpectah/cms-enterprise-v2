import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from '../../routes';
import { MessagesItemProps } from '../../types/model';
import PageHeading from '../../component/PageHeading';
import DataTable from '../../component/DataTable';
import { BarPreloader } from '../../component/ui';

interface MessagesListProps {
	dataItems: MessagesItemProps[];
	onToggle: (master: number[]) => Promise<unknown>;
	onDelete: (master: number[]) => Promise<unknown>;
	loading: boolean;
}

const MessagesList = (props: MessagesListProps) => {
	const {
		dataItems = [],
		onToggle,
		onDelete,
		loading,
	} = props;

	const tableOptions = {
		id: 'MessagesDataTable',
		root: `/admin/app/${routes.messages.path}`,
	};

	const { t } = useTranslation(['common', 'pages']);
	const navigate = useNavigate();

	return (
		<>
			<PageHeading
				title={t(`pages:messages.page_title`)}
				createButtonLabel={t('model_new.Messages')}
				createButtonPath={`${tableOptions.root}/detail/new`}
			/>
			{loading && <BarPreloader />}
			<DataTable
				model="Messages"
				id={tableOptions.id}
				rows={dataItems}
				columns={{
					id: ['center', '100px'],
					name: ['left', 'auto'],
					type: ['left', '150px'],
					active: ['right', '125px'],
				}}
				searchProps={[
					'sender',
					'recipients',
					'title',
					'content',
				]}
				onDetail={(id) => navigate(`${tableOptions.root}/detail/${id}`)}
				onToggle={onToggle}
				onDelete={onDelete}
				loading={loading}
			/>
		</>
	);
};

export default MessagesList;
