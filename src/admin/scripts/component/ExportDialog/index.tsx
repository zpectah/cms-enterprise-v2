import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Stack, Typography } from '@mui/material';

import config from '../../config';
import { appModel } from '../../types/app';
import useSystem from '../../hooks/useSystem';
import { downloadObjectAsJson } from '../../utils/file';
import {
	Dialog,
	DialogProps,
	Toggle,
	Button,
} from '../ui';

export interface ExportDialogProps extends DialogProps {
	dataToExport?: (string | number)[];
	afterExport?: (response: unknown) => void;
	model: appModel;
	disabledSql?: boolean;
	disabledCsv?: boolean;
	disabledJson?: boolean;
}

const ExportDialog = (props: ExportDialogProps) => {
	const {
		dataToExport = [],
		afterExport,
		model,
		open = false,
		onClose,
		disabledSql,
		disabledCsv,
		disabledJson,
		...rest
	} = props;

	const { t } = useTranslation([ 'components' ]);
	const { exportData } = useSystem();
	const [ isOpen, setIsOpen ] = useState<boolean>(open);
	const [ format, setFormat ] = useState('json');
	const [ loading, setLoading ] = useState(false);

	const handleClose = () => {
		setIsOpen(false);
		onClose();
	};
	const handleExport = () => {
		setLoading(true);
		return exportData({
			format,
			model,
			ids: dataToExport,
		}).then((resp) => {
			setLoading(false);
			const now = new Date();
			const fileNamePrefix = `${model.toLocaleLowerCase()}_export_${now.getTime()}`;
			downloadObjectAsJson(resp.data, fileNamePrefix).then(() => {
				handleClose();
				if (afterExport) afterExport(resp);
			});
		});
	};

	useEffect(() => setIsOpen(open), [open]);

	return (
		<>
			<Dialog
				open={isOpen}
				onClose={onClose}
				showHeaderClose
				maxWidth="sm"
				id="ExportDialogDialog"
				title={t('components:ExportDialog.title')}
				dialogContentProps={{
					sx: {
						p: 0,
					},
				}}
				{...rest}
			>
				<Box
					sx={{
						py: 2,
						px: 3,
					}}
				>
					<Typography
						variant="caption"
					>
						{t('components:ExportDialog.caption')}
					</Typography>
					<Typography
						sx={{
							my: 2,
						}}
					>
						{t('components:ExportDialog.sub')}: {dataToExport.length}
					</Typography>
					<Stack
						direction="row"
						spacing={2}
					>
						<Toggle
							value={format}
							size="small"
							items={[
								{
									key: 'json',
									value: 'json',
									children: <>json</>,
									onClick: () => setFormat('json'),
									disabled: disabledJson || !config.project.extras.TABLE_EXPORT_JSON,
								},
								{
									key: 'csv',
									value: 'csv',
									children: <>csv</>,
									onClick: () => setFormat('csv'),
									disabled: disabledCsv || !config.project.extras.TABLE_EXPORT_CSV,
								},
								{
									key: 'sql',
									value: 'sql',
									children: <>sql</>,
									onClick: () => setFormat('sql'),
									disabled: disabledSql || !config.project.extras.TABLE_EXPORT_SQL,
								},
							]}
						/>
					</Stack>
					<Stack
						direction="row"
						spacing={2}
						sx={{
							mt: 3,
							mb: 2,
						}}
					>
						<Button
							color="success"
							variant="contained"
							onClick={handleExport}
							loading={loading}
						>
							{t('components:ExportDialog.button')}
						</Button>
					</Stack>
				</Box>
			</Dialog>
		</>
	);
};

export default ExportDialog;
