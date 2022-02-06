import React from 'react';
import { useTranslation } from 'react-i18next';

import ButtonBase, { ButtonBaseProps } from './Button.Base';

interface SubmitButtonProps extends ButtonBaseProps {}

const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
	const { t } = useTranslation('common');
	const {
		...rest
	} = props;

	return (
		<ButtonBase
			type="submit"
			variant="contained"
			color="primary"
			dataId="submit-button"
			{...rest}
		>
			{t('btn.submit')}
		</ButtonBase>
	);
};

export default SubmitButton;