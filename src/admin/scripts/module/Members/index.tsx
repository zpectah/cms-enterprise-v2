import React, { useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { UsersItemProps } from '../../types/model';
import { useMembers } from '../../hooks/model';
import useToasts from '../../hooks/useToasts';
import MembersList from './MembersList';
import MembersDetail from './MembersDetail';

const UsersModule = () => {
	const { t } = useTranslation([ 'messages' ]);
	const {
		members,
		members_loading,
		members_error,
		reloadMembers,
		createMembers,
		updateMembers,
		toggleMembers,
		deleteMembers,
	} = useMembers();
	const params = useParams();
	const {
		createSuccessToast,
		createErrorToast,
	} = useToasts();

	const submitHandler = (method: 'create' | 'update', master: UsersItemProps) => {
		switch (method) {
			case 'create':
				return createMembers(master).then((resp) => {
					createSuccessToast({ title: t('messages:model.item_created') });
					reloadMembers();

					return resp;
				});

			case 'update':
				return updateMembers(master).then((resp) => {
					createSuccessToast({ title: t('messages:model.item_updated') });
					reloadMembers();

					return resp;
				});
		}
	};
	const deleteHandler = (master: number[]) => {
		return deleteMembers(master).then((resp) => {
			createSuccessToast({ title: master.length === 1 ? t('messages:model.item_deleted') : t('messages:model.items_deleted') });
			reloadMembers();

			return resp;
		});
	};
	const toggleHandler = (master: number[]) => {
		return toggleMembers(master).then((resp) => {
			createSuccessToast({ title: master.length === 1 ? t('messages:model.item_updated') : t('messages:model.items_updated') });
			reloadMembers();

			return resp;
		});
	};

	useEffect(() => {
		if (members_error) createErrorToast({ title: members_error });
	}, [ members_error ]);

	return (
		<>
			<Routes>
				<Route path="detail/:id" element={
					<MembersDetail
						key={params['*']}
						dataItems={members}
						onSubmit={submitHandler}
						onDelete={deleteHandler}
						loading={members_loading}
					/>
				} />
				<Route index element={
					<MembersList
						dataItems={members}
						onToggle={toggleHandler}
						onDelete={deleteHandler}
						loading={members_loading}
					/>
				} />
			</Routes>
		</>
	);
};

export default UsersModule;
