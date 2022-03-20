import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';

import { useVisitorBlacklist } from '../../hooks/model';
import { VisitorBlacklistItemProps } from '../../types/model';
import {
	BarPreloader,
	ConfirmDialog,
} from '../../component/ui';
import VisitorBlacklistList from '../VisitorBlacklist/VisitorBlacklistList';
import VisitorBlacklistDetail from '../VisitorBlacklist/VisitorBlacklistDetail';
import { getDetailData } from '../../utils';

export interface SettingsBlacklistProps {}

const SettingsBlacklist = (props: SettingsBlacklistProps) => {
	const {} = props;

	const { t } = useTranslation([]);
	const [ detailOpen, setDetailOpen ] = useState(false);
	const [ detailData, setDetailData ] = useState<VisitorBlacklistItemProps | null>(null);
	const [ confirmOpen, setConfirmOpen ] = useState(false);
	const [ confirmData, setConfirmData ] = useState<number[]>([]);
	const [ updating, setUpdating ] = useState(false);
	const {
		visitorBlacklist,
		visitorBlacklist_loading,
		reloadVisitorBlacklist,
		createVisitorBlacklist,
		updateVisitorBlacklist,
		deleteVisitorBlacklist,
	} = useVisitorBlacklist();

	const openDetailHandler = (id: number | 'new') => {
		setDetailOpen(true);
		setDetailData(getDetailData(
			'VisitorBlacklist',
			visitorBlacklist,
			id,
		));
	};
	const closeDetailHandler = () => {
		setDetailOpen(false);
		setDetailData(null);
	};
	const deleteDetailHandler = (id: number) => {
		setConfirmOpen(true);
		setConfirmData([ id ]);
	};
	const deleteConfirmDetailHandler = () => {
		setUpdating(true);
		const master = [ ...confirmData ];
		deleteVisitorBlacklist(master).then((resp) => {
			reloadVisitorBlacklist();
			setUpdating(false);
			return resp;
		});
	};
	const detailSubmitHandler = (master: VisitorBlacklistItemProps) => {
		setUpdating(true);
		const method = master.id === 'new' ? 'create' : 'update';
		if (method === 'create') {
			return createVisitorBlacklist(master).then((resp) => {
				reloadVisitorBlacklist();
				closeDetailHandler();
				setUpdating(false);
				return resp;
			});
		} else if (method === 'update') {
			return updateVisitorBlacklist(master).then((resp) => {
				reloadVisitorBlacklist();
				closeDetailHandler();
				setUpdating(false);
				return resp;
			});
		}

		return new Promise<unknown>(() => {
			console.warn('no promise');
			setUpdating(false);
			return null;
		});
	};
	const closeConfirmHandler = () => {
		setConfirmOpen(false);
		setConfirmData([]);
	};

	return (
		<>
			<VisitorBlacklistList
				rows={visitorBlacklist}
				onDetail={openDetailHandler}
				onDelete={deleteDetailHandler}
			/>
			<VisitorBlacklistDetail
				open={detailOpen}
				onClose={closeDetailHandler}
				detailData={detailData}
				onSubmit={detailSubmitHandler}
			/>
			<ConfirmDialog
				context="delete"
				open={confirmOpen}
				confirmData={confirmData}
				onClose={closeConfirmHandler}
				onConfirm={deleteConfirmDetailHandler}
			/>
			{(visitorBlacklist_loading || updating) && (
				<BarPreloader />
			)}
		</>
	);
};

export default SettingsBlacklist;
