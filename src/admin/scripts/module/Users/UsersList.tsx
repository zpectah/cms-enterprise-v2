import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from '../../routes';
import { UsersItemProps } from '../../types/model';
import { entityActionsType } from '../../types/common';
import PageHeading from '../../component/PageHeading';
import DataTable from '../../component/DataTable';
import { BarPreloader } from '../../component/ui';

interface UsersListProps {
	dataItems: UsersItemProps[];
	onToggle: (master: number[]) => Promise<unknown>;
	onDelete: (master: number[]) => Promise<unknown>;
	loading: boolean;
	actions: entityActionsType;
	role: string;
}

const UsersList = (props: UsersListProps) => {
	const {
		dataItems = [],
		onToggle,
		onDelete,
		loading,
		actions,
		role,
	} = props;

	const tableOptions = {
		id: 'UsersDataTable',
		root: `/admin/app/${routes.users.path}`,
	};

	const { t } = useTranslation(['common', 'pages']);
	const navigate = useNavigate();

	return (
		<>
			<PageHeading
				title={t(`pages:users.page_title`)}
				createButtonLabel={t('model_new.Users')}
				createButtonPath={`${tableOptions.root}/detail/new`}
			/>
			{loading && <BarPreloader />}
			<DataTable
				model="Users"
				id={tableOptions.id}
				rows={dataItems}
				columns={{
					id: ['center', '100px'],
					email: ['left', 'auto'],
					type: ['left', '150px'],
					active: ['right', '125px'],
				}}
				searchProps={[
					'email',
					'name_first',
					'name_last',
					'nickname',
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

export default UsersList;
