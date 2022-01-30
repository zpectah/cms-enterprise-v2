import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

import { UsersItemProps } from '../../types/model';
import { submitMethodProps } from '../../types/common';
import getDetailData from '../../utils/getDetailData';
import { Dialog } from '../../component/ui';

interface UsersDetailProps {
	dataItems: UsersItemProps[];
	onSubmit: (method: submitMethodProps, data: UsersItemProps) => Promise<unknown>;
	onDelete: (ids: (string | number)[]) => Promise<unknown>;
	loading: boolean;
}

const UsersDetail = (props: UsersDetailProps) => {
	const {
		dataItems = [],
		onSubmit,
		onDelete,
		loading,
	} = props;
	const params = useParams();
	const [ detailData, setDetailData ] = useState<UsersItemProps>(null);
	const [ confirmOpen, setConfirmOpen ] = useState<boolean>(false);
	const [ confirmData, setConfirmData ] = useState<(string | number)[]>([]);

	const submitHandler = (data: UsersItemProps) => {
		const master = _.cloneDeep(data);
		const method: submitMethodProps = master.id == 'new' ? 'create' : 'update';
		onSubmit(method, master).then((resp) => {
			// TODO: after submit ...
		});
	};
	const deleteHandler = (id: string | number) => {
		setConfirmOpen(true);
		setConfirmData([id]);
	};
	const deleteConfirmHandler = () => {
		onDelete(confirmData).then((resp) => {
			setConfirmOpen(false);
			setConfirmData([]);
		});
	};
	const closeConfirmHandler = () => {
		setConfirmOpen(false);
		setConfirmData([]);
	};

	useEffect(() => setDetailData(getDetailData('Users', dataItems, params.id)), [ dataItems, params ]);

	return (
		<>
			<div>...UsersDetail...{JSON.stringify(detailData)}...</div>
			<Dialog.Confirm
				context="delete"
				isOpen={confirmOpen}
				confirmData={confirmData}
				onConfirm={deleteConfirmHandler}
				onClose={closeConfirmHandler}
			/>
		</>
	);
};

export default UsersDetail;
