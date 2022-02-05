import React from 'react';

import DrawerBase, { DrawerBaseProps } from './Drawer.Base';

export interface DrawerProps extends DrawerBaseProps {}

const Drawer: React.FC<DrawerProps> = (props) => {
	const {
		...rest
	} = props;

	return (
		<DrawerBase
			{...rest}
		/>
	);
};

export default Drawer;
