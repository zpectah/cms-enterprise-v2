import React from 'react';

import ScrollableBase, { ScrollableBaseProps } from './Scrollable.Base';

export interface ScrollableProps extends ScrollableBaseProps {}

const Scrollable: React.FC<ScrollableProps> = (props) => {
	const {
		...rest
	} = props;

	return (
		<ScrollableBase
			{...rest}
		/>
	);
};

export default Scrollable;
