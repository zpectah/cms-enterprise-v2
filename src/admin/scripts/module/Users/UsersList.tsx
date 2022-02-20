import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from '../../routes';
import { UsersItemProps } from '../../types/model';
import PageHeading from '../../component/PageHeading';
import DataTable from '../../component/DataTable';
import {
	LoadingBar,
} from '../../component/ui';

interface UsersListProps {
	dataItems: UsersItemProps[];
	onToggle: (ids: number[]) => Promise<unknown>;
	onDelete: (ids: number[]) => Promise<unknown>;
	loading: boolean;
}

const UsersList = (props: UsersListProps) => {
	const {
		dataItems = [],
		onToggle,
		onDelete,
		loading,
	} = props;

	const tableOptions = {
		id: 'UsersDataTable',
		root: `/admin/app/${routes.users.path}`,
	};

	const { t } = useTranslation(['pages']);
	const navigate = useNavigate();

	const openDetailHandler = (id: string | number) => {
		navigate(`${tableOptions.root}/detail/${id}`);
	};

	return (
		<>
			<PageHeading
				title={t(`pages:users.page_title`)}
			/>
			{loading && <LoadingBar />}
			<DataTable
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
				]}
				onDetail={(id) => openDetailHandler(id)}
				onToggle={onToggle}
				onDelete={onDelete}
			/>
		</>
	);
};

export default UsersList;
