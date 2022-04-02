import React, { useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Alert } from '@mui/material';

import { UploadsItemProps } from '../../types/model';
import { useUploads } from '../../hooks/model';
import useToasts from '../../hooks/useToasts';
import UploadsList from './UploadsList';
import UploadsDetail from './UploadsDetail';
import useProfile from '../../hooks/useProfile';

const UploadsModule = () => {
	const { t } = useTranslation([ 'messages' ]);
	const {
		uploads,
		uploads_loading,
		uploads_error,
		reloadUploads,
		createUploads,
		updateUploads,
		toggleUploads,
		deleteUploads,
	} = useUploads();
	const params = useParams();
	const {
		createSuccessToast,
		createErrorToast,
	} = useToasts();
	const { available_actions } = useProfile();

	const submitHandler = (method: 'create' | 'update', master: UploadsItemProps) => {
		switch (method) {
			case 'create':
				return createUploads(master).then((resp) => {
					createSuccessToast({ title: t('messages:model.item_created') });
					reloadUploads();

					return resp;
				});

			case 'update':
				return updateUploads(master).then((resp) => {
					createSuccessToast({ title: t('messages:model.item_updated') });
					reloadUploads();

					return resp;
				});
		}
	};
	const deleteHandler = (master: number[]) => {
		return deleteUploads(master).then((resp) => {
			createSuccessToast({ title: master.length === 1 ? t('messages:model.item_deleted') : t('messages:model.items_deleted') });
			reloadUploads();

			return resp;
		});
	};
	const toggleHandler = (master: number[]) => {
		return toggleUploads(master).then((resp) => {
			createSuccessToast({ title: master.length === 1 ? t('messages:model.item_updated') : t('messages:model.items_updated') });
			reloadUploads();

			return resp;
		});
	};

	useEffect(() => {
		if (uploads_error) createErrorToast({ title: uploads_error });
	}, [ uploads_error ]);

	return (
		<>
			{available_actions.Uploads.view ? (
				<Routes>
					<Route path="detail/:id" element={
						<UploadsDetail
							key={params['*']}
							dataItems={uploads}
							onSubmit={submitHandler}
							onDelete={deleteHandler}
							loading={uploads_loading}
							onFinishSubmit={(count) => {
								if (count > 1) createSuccessToast({ title: t('messages:model.all_files_uploaded') });
							}}
							actions={available_actions.Uploads}
						/>
					} />
					<Route index element={
						<UploadsList
							dataItems={uploads}
							onToggle={toggleHandler}
							onDelete={deleteHandler}
							loading={uploads_loading}
							actions={available_actions.Uploads}
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

export default UploadsModule;
