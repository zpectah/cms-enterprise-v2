import React from 'react';

import MultiselectBase, { MultiselectBaseProps } from './Multiselect.Base';

export interface MultiselectProps extends MultiselectBaseProps {}

const Multiselect: React.FC<MultiselectProps> = (props) => {
	const {
		...rest
	} = props;

	return (
		<MultiselectBase
			{...rest}
		/>
	);
};

export default Multiselect;
