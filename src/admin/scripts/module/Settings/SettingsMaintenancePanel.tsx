import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Alert } from '@mui/material';

import useSystem from '../../hooks/useSystem';
import {
	Button,
	ConfirmDialog,
	TextPreloader,
} from '../../component/ui';

export interface SettingsMaintenancePanelProps {
	afterTrigger: (action: 'delete_items' | 'delete_files') => void;
}

const SettingsMaintenancePanel = (props: SettingsMaintenancePanelProps) => {
	const {
		afterTrigger,
	} = props;

	const { t } = useTranslation([ 'components' ]);
	const [ action, setAction ] = useState<'delete_items' | 'delete_files' | null>(null);
	const [ confirmOpen, setConfirmOpen ] = useState(false);
	const [ itemsProcess, setItemsProcess ] = useState(false);
	const [ filesProcess, setFilesProcess ] = useState(false);
	const [ itemsResult, setItemsResult ] = useState(null);
	const [ filesResult, setFilesResult ] = useState(null);
	const {
		deletePermanentItems,
		deletePermanentFiles,
	} = useSystem();

	const confirmHandler = () => {
		const reset = () => {
			setConfirmOpen(false);
			setAction(null);
			if (action) afterTrigger(action);
		};
		if (action) {
			switch (action) {

				case 'delete_items':
					setItemsProcess(true);
					return deletePermanentItems({}).then((resp) => {


						console.log('resp ... deletePermanentItems', resp);


						setItemsProcess(false);
						setItemsResult('.... deletePermanentItems : result');
						reset();
					});

				case 'delete_files':
					setFilesProcess(true);
					return deletePermanentFiles({}).then((resp) => {


						console.log('resp ... deletePermanentFiles', resp);


						setFilesProcess(false);
						setFilesResult('.... deletePermanentFiles : result');
						reset();
					});


			}

		}
	};
	const openConfirmHandler = (action: 'delete_items' | 'delete_files') => {
		setAction(action);
		setConfirmOpen(true);
	};
	const closeConfirmHandler = () => {
		setConfirmOpen(false);
		setAction(null);
	};
	
	return (
		<>
			<div>
				<Alert
					severity="warning"
					sx={{
						mb: 2,
					}}
				>
					{t('components:SettingsForm.maintenance_panel.alert_message')}
				</Alert>
				<TableContainer>
					<Table>
						<colgroup>
							<col style={{ width: '30%' }} />
							<col style={{ width: 'auto' }} />
							<col style={{ width: '150px', textAlign: 'right' }} />
						</colgroup>
						<TableBody>
							<TableRow>
								<TableCell
									component="th"
									scope="row"
								>
									{t('components:SettingsForm.maintenance_panel.action.delete_items.label')}
								</TableCell>
								<TableCell>
									{itemsProcess && <TextPreloader />}
									{itemsResult && itemsResult}
								</TableCell>
								<TableCell>
									<Button
										variant="outlined"
										onClick={() => openConfirmHandler('delete_items')}
										loading={itemsProcess}
										disabled={!!itemsResult}
									>
										{t('components:SettingsForm.maintenance_panel.action.delete_items.trigger')}
									</Button>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell
									component="th"
									scope="row"
								>
									{t('components:SettingsForm.maintenance_panel.action.delete_files.label')}
								</TableCell>
								<TableCell>
									{filesProcess && <TextPreloader />}
									{filesResult && filesResult}
								</TableCell>
								<TableCell>
									<Button
										variant="outlined"
										onClick={() => openConfirmHandler('delete_files')}
										loading={filesProcess}
										disabled={!!filesResult}
									>
										{t('components:SettingsForm.maintenance_panel.action.delete_files.trigger')}
									</Button>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</div>
			<ConfirmDialog
				open={confirmOpen}
				onClose={closeConfirmHandler}
				onConfirm={confirmHandler}
			/>
		</>
	);
};

export default SettingsMaintenancePanel;
