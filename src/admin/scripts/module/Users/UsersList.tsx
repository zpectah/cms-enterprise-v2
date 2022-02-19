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
		{ id: 1, email: 'neco1@email', lastName: 'Snow', firstName: 'Jon', age: 35 },
		{ id: 2, email: 'neco2@email', lastName: 'Lannister', firstName: 'Cersei', age: 42 },
		{ id: 3, email: 'neco3@email', lastName: 'Lannister', firstName: 'Jaime', age: 45 },
		{ id: 4, email: 'neco4@email', lastName: 'Stark', firstName: 'Arya', age: 16 },
		{ id: 5, email: 'neco5@email', lastName: 'Targaryen', firstName: 'Daenerys', age: null },
		{ id: 6, email: 'neco6@email', lastName: 'Melisandre', firstName: null, age: 150 },
		{ id: 7, email: 'neco7@email', lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
		{ id: 8, email: 'neco8@email', lastName: 'Frances', firstName: 'Rossini', age: 36 },
		{ id: 9, email: 'neco9@email', lastName: 'Roxie', firstName: 'Harvey', age: 65 },
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
