import React, { useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Alert } from '@mui/material';

import { TranslationsItemProps } from '../../types/model';
import { useTranslations } from '../../hooks/model';
import useToasts from '../../hooks/useToasts';
import TranslationsList from './TranslationsList';
import TranslationsDetail from './TranslationsDetail';
import useProfile from '../../hooks/useProfile';

const TranslationsModule = () => {
	const { t } = useTranslation([ 'messages' ]);
	const {
		translations,
		translations_loading,
		translations_error,
		reloadTranslations,
		createTranslations,
		updateTranslations,
		toggleTranslations,
		deleteTranslations,
	} = useTranslations();
	const params = useParams();
	const {
		createSuccessToast,
		createErrorToast,
	} = useToasts();
	const { available_actions } = useProfile();

	const submitHandler = (method: 'create' | 'update', master: TranslationsItemProps) => {
		switch (method) {
			case 'create':
				return createTranslations(master).then((resp) => {
					createSuccessToast({ title: t('messages:model.item_created') });
					reloadTranslations();

					return resp;
				});

			case 'update':
				return updateTranslations(master).then((resp) => {
					createSuccessToast({ title: t('messages:model.item_updated') });
					reloadTranslations();

					return resp;
				});
		}
	};
	const deleteHandler = (master: number[]) => {
		return deleteTranslations(master).then((resp) => {
			createSuccessToast({ title: master.length === 1 ? t('messages:model.item_deleted') : t('messages:model.items_deleted') });
			reloadTranslations();

			return resp;
		});
	};
	const toggleHandler = (master: number[]) => {
		return toggleTranslations(master).then((resp) => {
			createSuccessToast({ title: master.length === 1 ? t('messages:model.item_updated') : t('messages:model.items_updated') });
			reloadTranslations();

			return resp;
		});
	};

	useEffect(() => {
		if (translations_error) createErrorToast({ title: translations_error });
	}, [ translations_error ]);

	return (
		<>
			{available_actions.Translations.view ? (
				<Routes>
					<Route path="detail/:id" element={
						<TranslationsDetail
							key={params['*']}
							dataItems={translations}
							onSubmit={submitHandler}
							onDelete={deleteHandler}
							loading={translations_loading}
							actions={available_actions.Translations}
						/>
					} />
					<Route index element={
						<TranslationsList
							dataItems={translations}
							onToggle={toggleHandler}
							onDelete={deleteHandler}
							loading={translations_loading}
							actions={available_actions.Translations}
						/>
					} />
				</Routes>
			) : (
				<Alert
					severity="warning"
					sx={{ width: '100%' }}
				>
					{t('messages:profile.user_missing_permission')}
				</Alert>
			)}
		</>
	);
};

export default TranslationsModule;
