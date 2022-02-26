import React from 'react';
import { Routes, Route } from 'react-router-dom';

import routes from '../../routes';
import ErrorPage from '../../page/ErrorPage';
import DashboardPage from '../../page/DashboardPage';
import CategoriesPage from '../../page/CategoriesPage';
import MembersPage from '../../page/MembersPage';
import MenuPage from '../../page/MenuPage';
import MessagesPage from '../../page/MessagesPage';
import PagesPage from '../../page/PagesPage';
import PostsPage from '../../page/PostsPage';
import SettingsPage from '../../page/SettingsPage';
import TagsPage from '../../page/TagsPage';
import TranslationsPage from '../../page/TranslationsPage';
import UsersPage from '../../page/UsersPage';
import UploadsPage from '../../page/UploadsPage';

interface AppModuleProps {}

const AppModule = (props: AppModuleProps) => {
	const {} = props;

	return (
		<>
			<Routes>
				<Route path={`${routes.categories.path}/*`} element={<CategoriesPage />} />
				<Route path={`${routes.members.path}/*`} element={<MembersPage />} />
				<Route path={`${routes.menu.path}/*`} element={<MenuPage />} />
				<Route path={`${routes.messages.path}/*`} element={<MessagesPage />} />
				<Route path={`${routes.pages.path}/*`} element={<PagesPage />} />
				<Route path={`${routes.posts.path}/*`} element={<PostsPage />} />
				<Route path={`${routes.settings.path}/*`} element={<SettingsPage />} />
				<Route path={`${routes.tags.path}/*`} element={<TagsPage />} />
				<Route path={`${routes.translations.path}/*`} element={<TranslationsPage />} />
				<Route path={`${routes.users.path}/*`} element={<UsersPage />} />
				<Route path={`${routes.uploads.path}/*`} element={<UploadsPage />} />

				<Route index element={<DashboardPage />} />
				<Route path="*" element={<ErrorPage errorCode={404} />} />
			</Routes>
		</>
	);
};

export default AppModule;
