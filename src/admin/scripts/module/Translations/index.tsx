import React, { useEffect } from 'react';
import _ from 'lodash';
import { Routes, Route, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { TranslationsItemProps } from '../../types/model';
import { useTranslations } from '../../hooks/model';
import useToasts from '../../hooks/useToasts';
import transformString from '../../utils/transformString';
import TranslationsList from './TranslationsList';
import TranslationsDetail from './TranslationsDetail';

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

	const submitHandler = (method: 'create' | 'update', data: TranslationsItemProps) => {
		const master: TranslationsItemProps = _.cloneDeep(data);
		master.name = transformString(master.name, 'empty-to-dash');
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
	const deleteHandler = (ids: number[]) => {
		const master = [ ...ids ];
		return deleteTranslations(master).then((resp) => {
			createSuccessToast({ title: master.length === 1 ? t('messages:model.item_deleted') : t('messages:model.items_deleted') });
			reloadTranslations();

			return resp;
		});
	};
	const toggleHandler = (ids: number[]) => {
		const master = [ ...ids ];
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
			<Routes>
				<Route path="detail/:id" element={
					<TranslationsDetail
						key={params['*']}
						dataItems={translations}
						onSubmit={submitHandler}
						onDelete={deleteHandler}
						loading={translations_loading}
					/>
				} />
				<Route index element={
					<TranslationsList
						dataItems={translations}
						onToggle={toggleHandler}
						onDelete={deleteHandler}
						loading={translations_loading}
					/>
				} />
			</Routes>
		</>
	);
};

export default TranslationsModule;
