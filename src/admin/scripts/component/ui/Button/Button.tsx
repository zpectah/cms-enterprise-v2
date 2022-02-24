import React from 'react';

import ButtonBase, { ButtonBaseProps } from './Button.Base';

export interface ButtonProps extends ButtonBaseProps {}

const Button: React.FC<ButtonProps> = (props) => {
	const {
		...rest
	} = props;

	return (
		<ButtonBase
			{...rest}
		/>
	);
};

export default Button;
