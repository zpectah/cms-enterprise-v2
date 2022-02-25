import React from 'react';
import { useTranslation } from 'react-i18next';
import SendIcon from '@mui/icons-material/Send';

import ButtonBase, { ButtonBaseProps } from './Button.Base';

export interface SubmitButtonProps extends ButtonBaseProps {}

const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
	const { t } = useTranslation('common');
	const {
		children,
		...rest
	} = props;

	return (
		<ButtonBase
			type="submit"
			variant="contained"
			color="primary"
			dataId="submit-button"
			endIcon={<SendIcon fontSize="small" />}
			{...rest}
		>
			{children ? children : t('btn.submit')}
		</ButtonBase>
	);
};

export default SubmitButton;