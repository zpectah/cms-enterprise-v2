import React from 'react';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';

import ButtonBase, { ButtonBaseProps } from './Button.Base';

interface AddButtonProps extends ButtonBaseProps {
	label?: string;
}

const AddButton: React.FC<AddButtonProps> = (props) => {
	const { t } = useTranslation('common');
	const {
		label = t('btn.create'),
		...rest
	} = props;

	return (
		<ButtonBase
			variant="contained"
			color="success"
			dataId="add-button"
			startIcon={<AddIcon fontSize="small" />}
			{...rest}
		>
			{label}
		</ButtonBase>
	);
};

export default AddButton;