import React from 'react';
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@mui/icons-material/Delete';

import ButtonBase, { ButtonBaseProps } from './Button.Base';

export interface DeleteButtonProps extends ButtonBaseProps {}

const DeleteButton: React.FC<DeleteButtonProps> = (props) => {
	const { t } = useTranslation('common');
	const {
		...rest
	} = props;

	return (
		<ButtonBase
			variant="contained"
			color="warning"
			dataId="danger-button"
			startIcon={<DeleteIcon fontSize="small" />}
			{...rest}
		>
			{t('btn.delete')}
		</ButtonBase>
	);
};

export default DeleteButton;