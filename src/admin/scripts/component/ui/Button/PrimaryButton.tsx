import React from 'react';

import ButtonBase, { ButtonBaseProps } from './Button.Base';

interface PrimaryButtonProps extends ButtonBaseProps {}

const PrimaryButton: React.FC<PrimaryButtonProps> = (props) => {
	const {
		...rest
	} = props;

	return (
		<ButtonBase
			variant="contained"
			color="primary"
			{...rest}
		/>
	);
};

export default PrimaryButton;