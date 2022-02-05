import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { Global } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';

import BaseTheme from './styles/theme';
import globalStyles from './styles/global';
import ErrorBoundary from './component/ErrorBoundary';
import LanguageService from './service/Language.service';
import ThemeService from './service/Theme.service';
import { appStoreProps } from './types/store';
import { PagePreloader } from './component/ui';
import RequireAuth from './component/RequireAuth';
import ErrorPage from './page/ErrorPage';
import LoginPage from './page/LoginPage';
import LostPasswordPage from './page/LostPasswordPage';

const AppModule = React.lazy(() => import('./module/App'));

const App = () => {
	const { appTheme } = useSelector((store: appStoreProps) => store);

	useEffect(() => {
		LanguageService.init();
		ThemeService.init();

		return () => null;
	}, []);

	return (
		<ThemeProvider theme={BaseTheme(appTheme)}>
			<CssBaseline />
			<Global styles={globalStyles} />
			<ErrorBoundary>
				<Router>
					<Routes>
						<Route path="/admin/">
							<Route path="app/*" element={
								<RequireAuth>
									<Suspense fallback={<PagePreloader />}>
										<AppModule />
									</Suspense>
								</RequireAuth>
							} />
							<Route path="login" element={<LoginPage />} />
							<Route path="lost-password/*" element={<LostPasswordPage />} />
							<Route index element={<Navigate to="login" replace />} />
						</Route>
						<Route path="*" element={<ErrorPage errorCode={404} />} />
					</Routes>
				</Router>
			</ErrorBoundary>
		</ThemeProvider>
	);
};

export default App;
