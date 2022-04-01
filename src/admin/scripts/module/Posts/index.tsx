import React, { useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { PostsItemProps } from '../../types/model';
import { usePosts } from '../../hooks/model';
import useToasts from '../../hooks/useToasts';
import PostsList from './PostsList';
import PostsDetail from './PostsDetail';
import useProfile from '../../hooks/useProfile';

const PostsModule = () => {
	const { t } = useTranslation([ 'messages' ]);
	const {
		posts,
		posts_loading,
		posts_error,
		reloadPosts,
		createPosts,
		updatePosts,
		togglePosts,
		deletePosts,
	} = usePosts();
	const params = useParams();
	const {
		createSuccessToast,
		createErrorToast,
	} = useToasts();
	const { available_actions } = useProfile();

	const submitHandler = (method: 'create' | 'update', master: PostsItemProps) => {
		switch (method) {
			case 'create':
				return createPosts(master).then((resp) => {
					createSuccessToast({ title: t('messages:model.item_created') });
					reloadPosts();

					return resp;
				});

			case 'update':
				return updatePosts(master).then((resp) => {
					createSuccessToast({ title: t('messages:model.item_updated') });
					reloadPosts();

					return resp;
				});
		}
	};
	const deleteHandler = (master: number[]) => {
		return deletePosts(master).then((resp) => {
			createSuccessToast({ title: master.length === 1 ? t('messages:model.item_deleted') : t('messages:model.items_deleted') });
			reloadPosts();

			return resp;
		});
	};
	const toggleHandler = (master: number[]) => {
		return togglePosts(master).then((resp) => {
			createSuccessToast({ title: master.length === 1 ? t('messages:model.item_updated') : t('messages:model.items_updated') });
			reloadPosts();

			return resp;
		});
	};

	useEffect(() => {
		if (posts_error) createErrorToast({ title: posts_error });
	}, [ posts_error ]);

	return (
		<>
			{available_actions.Posts.view ? (
				<Routes>
					<Route path="detail/:id" element={
						<PostsDetail
							key={params['*']}
							dataItems={posts}
							onSubmit={submitHandler}
							onDelete={deleteHandler}
							loading={posts_loading}
						/>
					} />
					<Route index element={
						<PostsList
							dataItems={posts}
							onToggle={toggleHandler}
							onDelete={deleteHandler}
							loading={posts_loading}
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

export default PostsModule;
