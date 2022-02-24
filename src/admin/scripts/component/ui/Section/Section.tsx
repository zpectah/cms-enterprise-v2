import React from 'react';

import SectionBase, { SectionBaseProps } from './Section.Base';

export interface SectionProps extends SectionBaseProps {}

const Section: React.FC<SectionProps> = (props) => {
	const {
		...rest
	} = props;

	return (
		<SectionBase
			{...rest}
		/>
	);
};

export default Section;
