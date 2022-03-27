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
		deletePermanentUploads,
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
					return deletePermanentItems().then((resp) => {
						let result = `Categories: ${resp.data?.categories?.db};\n`;
						result += `Comments: ${resp.data?.comments?.db};\n`;
						result += `Members: ${resp.data?.members?.db};\n`;
						result += `Menu: ${resp.data?.menu?.db};\n`;
						result += `Menu Items: ${resp.data?.menuItems?.db};\n`;
						result += `Messages: ${resp.data?.messages?.db};\n`;
						result += `Pages: ${resp.data?.pages?.db};\n`;
						result += `Posts: ${resp.data?.posts?.db};\n`;
						result += `Tags: ${resp.data?.tags?.db};\n`;
						result += `Translations: ${resp.data?.translations?.db};\n`;
						result += `Users: ${resp.data?.users?.db}'\n`;
						result += `Visitor Blacklist: ${resp.data?.visitorBlacklist?.db}'\n`;
						setItemsProcess(false);
						setItemsResult(result);
						reset();
					});

				case 'delete_files':
					setFilesProcess(true);
					return deletePermanentUploads().then((resp) => {
						setFilesProcess(false);
						setFilesResult(`Deleted rows in database: ${resp.data?.db}, files: ${resp.data?.files?.length || 0}`);
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
