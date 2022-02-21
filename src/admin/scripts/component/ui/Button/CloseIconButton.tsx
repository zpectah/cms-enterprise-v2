import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { SvgIconProps } from '@mui/material';

import IconButtonBase, { IconButtonBaseProps } from './IconButton.Base';

interface CloseIconButtonProps extends IconButtonBaseProps {
	iconProps?: SvgIconProps;
}

const CloseIconButton = (props: CloseIconButtonProps) => {
	const {
		iconProps,
		...rest
	} = props;

	return (
		<IconButtonBase
			color="inherit"
			size="small"
			{...rest}
		>
			<CloseIcon
				fontSize="inherit"
				color="inherit"
				{...iconProps}
			/>
		</IconButtonBase>
	);
};

export default CloseIconButton;
