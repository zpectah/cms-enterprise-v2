import React, { useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { MessagesItemProps } from '../../types/model';
import { useMessages } from '../../hooks/model';
import useToasts from '../../hooks/useToasts';
import MessagesList from './MessagesList';
import MessagesDetail from './MessagesDetail';
import useProfile from '../../hooks/useProfile';

const TagsModule = () => {
	const { t } = useTranslation([ 'messages' ]);
	const {
		messages,
		messages_loading,
		messages_error,
		reloadMessages,
		createMessages,
		updateMessages,
		toggleMessages,
		deleteMessages,
		markReadMessages,
	} = useMessages();
	const params = useParams();
	const {
		createSuccessToast,
		createErrorToast,
	} = useToasts();
	const { available_actions } = useProfile();

	const submitHandler = (method: 'create' | 'update', master: MessagesItemProps) => {
		switch (method) {
			case 'create':
				return createMessages(master).then((resp) => {
					createSuccessToast({ title: t('messages:model.item_created') });
					reloadMessages();

					return resp;
				});

			case 'update':
				return updateMessages(master).then((resp) => {
					createSuccessToast({ title: t('messages:model.item_updated') });
					reloadMessages();

					return resp;
				});
		}
	};
	const deleteHandler = (master: number[]) => {
		return deleteMessages(master).then((resp) => {
			createSuccessToast({ title: master.length === 1 ? t('messages:model.item_deleted') : t('messages:model.items_deleted') });
			reloadMessages();

			return resp;
		});
	};
	const toggleHandler = (master: number[]) => {
		return toggleMessages(master).then((resp) => {
			createSuccessToast({ title: master.length === 1 ? t('messages:model.item_updated') : t('messages:model.items_updated') });
			reloadMessages();

			return resp;
		});
	};
	const markReadHandler = (master: number[]) => {
		return markReadMessages(master).then((resp) => {
			createSuccessToast({ title: master.length === 1 ? t('messages:model.item_updated') : t('messages:model.items_updated') });
			reloadMessages();

			return resp;
		});
	};

	useEffect(() => {
		if (messages_error) createErrorToast({ title: messages_error });
	}, [ messages_error ]);

	return (
		<>
			{available_actions.Messages.view ? (
				<Routes>
					<Route path="detail/:id" element={
						<MessagesDetail
							key={params['*']}
							dataItems={messages}
							onSubmit={submitHandler}
							onDelete={deleteHandler}
							loading={messages_loading}
						/>
					} />
					<Route index element={
						<MessagesList
							dataItems={messages}
							onToggle={toggleHandler}
							onDelete={deleteHandler}
							loading={messages_loading}
						/>
					} />
				</Routes>
			) : (
				<>
					{t('messages:profile.user_missing_permission')}
				</>
			)}
		</>
	);
};

export default TagsModule;
