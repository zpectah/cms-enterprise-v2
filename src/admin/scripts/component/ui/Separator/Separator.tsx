import React from 'react';

export interface SeparatorProps {
	height?: number;
}

const Separator = (props: SeparatorProps) => {
	const {
		height = 1.5,
	} = props;

	return (
		<div
			style={{ height: `${height}rem` }}
		/>
	);
};

export default Separator;
