import React from 'react';

import ButtonBase, { ButtonBaseProps } from './Button.Base';

export interface PrimaryButtonProps extends ButtonBaseProps {}

const PrimaryButton: React.FC<PrimaryButtonProps> = (props) => {
	const {
		...rest
	} = props;

	return (
		<ButtonBase
			variant="contained"
			color="primary"
			dataId="primary-button"
			{...rest}
		/>
	);
};

export default PrimaryButton;
