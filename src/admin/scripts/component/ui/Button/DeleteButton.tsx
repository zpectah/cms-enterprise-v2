import React from 'react';
import { useTranslation } from 'react-i18next';

import ButtonBase, { ButtonBaseProps } from './Button.Base';

interface DeleteButtonProps extends ButtonBaseProps {}

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
			{...rest}
		>
			{t('btn.delete')}
		</ButtonBase>
	);
};

export default DeleteButton;