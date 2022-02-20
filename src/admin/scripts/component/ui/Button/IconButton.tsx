import React from 'react';

import IconButtonBase, { IconButtonBaseProps } from './IconButton.Base';

export interface IconButtonProps extends IconButtonBaseProps {}

const IconButton: React.FC<IconButtonProps> = (props) => {
	const {
		...rest
	} = props;

	return (
		<IconButtonBase
			{...rest}
		/>
	);
};

export default IconButton;
