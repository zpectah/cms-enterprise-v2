import React from 'react';

import ButtonBase, { ButtonBaseProps } from './Button.Base';

export interface SuccessButtonProps extends ButtonBaseProps {}

const SuccessButton: React.FC<SuccessButtonProps> = (props) => {
	const {
		...rest
	} = props;

	return (
		<ButtonBase
			variant="contained"
			color="success"
			dataId="success-button"
			{...rest}
		/>
	);
};

export default SuccessButton;
