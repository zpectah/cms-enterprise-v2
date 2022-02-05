import React from 'react';

import DialogBase, { DialogBaseProps } from './Dialog.Base';

export interface DialogProps extends DialogBaseProps {}

const Dialog: React.FC<DialogProps> = (props) => {
	const {
		...rest
	} = props;

	return (
		<DialogBase
			{...rest}
		/>
	);
};

export default Dialog;
