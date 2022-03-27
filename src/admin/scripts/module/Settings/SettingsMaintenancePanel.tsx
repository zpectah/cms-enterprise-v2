import React from 'react';
import { useTranslation } from 'react-i18next';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Alert } from '@mui/material';

import { Button } from '../../component/ui';

export interface SettingsMaintenancePanelProps {
	afterTrigger: () => void;
}

const SettingsMaintenancePanel = (props: SettingsMaintenancePanelProps) => {
	const {
		afterTrigger,
	} = props;

	const { t } = useTranslation([ 'components' ]);

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
						<TableBody>

							<TableRow>
								<TableCell
									component="th"
									scope="row"
								>
									Definitivně smazat všechny smazané položky
								</TableCell>
								<TableCell>
									<Button
										variant="outlined"
									>
										Zahájit
									</Button>
								</TableCell>
								<TableCell>
									... processing, ... result
								</TableCell>
							</TableRow>

							<TableRow>
								<TableCell
									component="th"
									scope="row"
								>
									Definitivně smazat všechny smazané soubory
								</TableCell>
								<TableCell>
									<Button
										variant="outlined"
									>
										Zahájit
									</Button>
								</TableCell>
								<TableCell>
									... processing, ... result
								</TableCell>
							</TableRow>

						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</>
	);
};

export default SettingsMaintenancePanel;
