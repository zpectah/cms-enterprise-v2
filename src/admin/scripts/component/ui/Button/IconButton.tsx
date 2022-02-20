import React from 'react';

import IconButtonBase, { IconButtonBaseProps } from './IconButton.Base';

export interface IconButtonProps extends IconButtonBaseProps {}

const IconButton: React.FC<IconButtonProps> = (props) => {
	const {
		...rest
	} = props;

	return (
		<IconButtonBase
			size="small"
			{...rest}
		/>
	);
};

export default IconButton;
