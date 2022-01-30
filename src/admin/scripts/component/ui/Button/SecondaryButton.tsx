import React from 'react';

import ButtonBase, { ButtonBaseProps } from './Button.Base';

interface SecondaryButtonProps extends ButtonBaseProps {}

const SecondaryButton: React.FC<SecondaryButtonProps> = (props) => {
	const {
		...rest
	} = props;

	return (
		<ButtonBase
			variant="contained"
			color="secondary"
			{...rest}
		/>
	);
};

export default SecondaryButton;