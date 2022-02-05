import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { SvgIconProps } from '@mui/material';

import IconButtonBase, { IconButtonBaseProps } from './IconButton.Base';

interface IconButtonCloseProps extends IconButtonBaseProps {
	iconProps?: SvgIconProps;
}

const IconButtonClose = (props: IconButtonCloseProps) => {
	const {
		iconProps,
		...rest
	} = props;

	return (
		<IconButtonBase
			{...rest}
		>
			<CloseIcon
				{...iconProps}
			/>
		</IconButtonBase>
	);
};

export default IconButtonClose;
