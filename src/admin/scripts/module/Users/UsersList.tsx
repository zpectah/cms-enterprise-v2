import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from '../../routes';
import { UsersItemProps } from '../../types/model';
import PageHeading from '../../component/PageHeading';
import {
	ConfirmDialog,
	LoadingBar,
	DataTable,
} from '../../component/ui';

interface UsersListProps {
	dataItems: UsersItemProps[];
	onToggle: (ids: (string | number)[]) => Promise<unknown>;
	onDelete: (ids: (string | number)[]) => Promise<unknown>;
	loading: boolean;
}

const UsersList = (props: UsersListProps) => {
	const {
		dataItems = [],
		onToggle,
		onDelete,
		loading,
	} = props;
	const { t } = useTranslation(['pages']);
	const navigate = useNavigate();
	const [ confirmOpen, setConfirmOpen ] = useState<boolean>(false);
	const [ confirmData, setConfirmData ] = useState<(string | number)[]>([]);
	const [ selectedItems, setSelectedItems ] = useState<(string | number)[]>([]);

	const toggleHandler = (id?: string | number) => {
		let source = id ? [id] : selectedItems;
		onToggle(source).then((resp) => {
			setSelectedItems([]);
		});
	};
	const deleteHandler = (id?: string | number) => {
		let source = id ? [id] : selectedItems;
		setConfirmOpen(true);
		setConfirmData(source);
	};
	const deleteConfirmHandler = () => {
		onDelete(confirmData).then((resp) => {
			setConfirmOpen(false);
			setConfirmData([]);
			setSelectedItems([]);
		});
	};
	const closeConfirmHandler = () => {
		setConfirmOpen(false);
		setConfirmData([]);
	};
	const openDetailHandler = (id: string | number) => {
		navigate(`/admin/app/${routes.users.path}/detail/${id}`);
	};

	const rows = [
		{ id: 1, email: 'neco1@email', type: 'default', lastName: 'Snow', firstName: 'Jon', age: 35, active: true },
		{ id: 2, email: 'neco2@email', type: 'default', lastName: 'Lannister', firstName: 'Cersei', age: 42, active: true },
		{ id: 3, email: 'neco3@email', type: 'default', lastName: 'Lannister', firstName: 'Jaime', age: 45, active: false },
		{ id: 4, email: 'neco4@email', type: 'default', lastName: 'Stark', firstName: 'Arya', age: 16, active: true },
		{ id: 5, email: 'neco5@email', type: 'default', lastName: 'Targaryen', firstName: 'Daenerys', age: null, active: true },
		{ id: 6, email: 'neco6@email', type: 'default', lastName: 'Melisandre', firstName: null, age: 150, active: true },
		{ id: 7, email: 'neco7@email', type: 'default', lastName: 'Clifford', firstName: 'Ferrara', age: 44, active: false },
		{ id: 8, email: 'neco8@email', type: 'admin', lastName: 'Frances', firstName: 'Rossini', age: 36, active: true },
		{ id: 9, email: 'neco9@email', type: 'default', lastName: 'Roxie', firstName: 'Harvey', age: 65, active: true },
	];

	return (
		<>
			<PageHeading
				title={t(`pages:users.page_title`)}
			/>
			{loading && <LoadingBar />}
			<div>...UsersList...{JSON.stringify(dataItems)}...</div>
			<DataTable
				rows={rows}
				columns={{
					id: ['center', '100px'],
					email: ['left', 'auto'],
					type: ['left', '150px'],
					active: ['right', '125px'],
				}}
				searchProps={[
					'email',
				]}
				onDetail={(id) => { console.log('onDetail', id) }}
				onToggle={(id) => { console.log('onToggle', id) }}
				onDelete={(id) => { console.log('onDelete', id) }}
			/>
			<ConfirmDialog
				context="delete"
				open={confirmOpen}
				confirmData={confirmData}
				onConfirm={deleteConfirmHandler}
				onClose={closeConfirmHandler}
			/>
		</>
	);
};

export default UsersList;
