import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	Box,
	BoxProps,
	Divider, Stack,
	Typography,
} from '@mui/material';

import { appModel } from '../../types/app';
import {
	Dialog,
	DialogProps,
	Toggle,
	Button,
} from '../ui';

export interface ExportDialogProps extends DialogProps {
	exportData?: (string | number)[];
	onExport: () => Promise<unknown>;
	model: appModel;
	disabledSql?: boolean;
	disabledCsv?: boolean;
	disabledJson?: boolean;
}

const ExportDialog = (props: ExportDialogProps) => {
	const {
		exportData = [],
		onExport,
		model,
		open = false,
		onClose,
		disabledSql,
		disabledCsv,
		disabledJson,
		...rest
	} = props;

	const { t } = useTranslation([ 'components' ]);
	const [ isOpen, setIsOpen ] = useState<boolean>(open);
	const [ format, setFormat ] = useState('json');
	const [ loading, setLoading ] = useState(false);

	const handleClose = () => {
		setIsOpen(false);
		onClose();
	};
	const handleExport = () => {
		setLoading(true);
		onExport().then(() =>  {
			setLoading(false);
			handleClose();
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
				<Divider />
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
						{t('components:ExportDialog.sub')}: {exportData.length}
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
									disabled: disabledJson,
								},
								{
									key: 'csv',
									value: 'csv',
									children: <>csv</>,
									onClick: () => setFormat('csv'),
									disabled: disabledCsv,
								},
								{
									key: 'sql',
									value: 'sql',
									children: <>sql</>,
									onClick: () => setFormat('sql'),
									disabled: disabledSql,
								},
							]}
						/>
					</Stack>
					<Stack
						direction="row"
						spacing={2}
						sx={{
							mt: 3,
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
