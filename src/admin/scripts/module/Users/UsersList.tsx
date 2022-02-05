import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UsersItemProps } from '../../types/model';
import { ConfirmDialog } from '../../component/ui';

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
		navigate(`/admin/app/users/detail/${id}`);
	};

	return (
		<>
			<div>...UsersList...{JSON.stringify(dataItems)}...</div>
			<ConfirmDialog
				context="delete"
				isOpen={confirmOpen}
				confirmData={confirmData}
				onConfirm={deleteConfirmHandler}
				onClose={closeConfirmHandler}
			/>
		</>
	);
};

export default UsersList;
