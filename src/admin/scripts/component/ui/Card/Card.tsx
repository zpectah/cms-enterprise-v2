import React from 'react';

import CardBase, { CardBaseProps } from './Card.Base';

export interface CardProps extends CardBaseProps {}

const Card = (props: CardProps) => {
	const {
		...rest
	} = props;

	return (
		<CardBase
			{...rest}
		/>
	);
};

export default Card;
