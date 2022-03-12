import React, { useState } from 'react';
import {
	CardHeader,
	CardHeaderProps,
	Divider,
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { IconButton } from '../Button';

export interface CardHeadingProps extends CardHeaderProps {
	collapsible?: boolean;
	collapse?: boolean;
	afterCollapse?: (open: boolean) => void;
	children?: React.ReactNode;
	divider?: boolean;
}

const CardHeading = (props: CardHeadingProps) => {
	const {
		title,
		collapsible,
		collapse,
		afterCollapse,
		children,
		divider,
		...rest
	} = props;

	const [ open, setOpen ] = useState(collapse);

	const onClickHandler = () => {
		let ns = !open;
		setOpen(ns);
		if (afterCollapse) {
			afterCollapse(ns);
		}
	};

	return (
		<>
			<CardHeader
				action={
					<IconButton
						onClick={onClickHandler}
					>
						{open ? (
							<ExpandLessIcon />
						) : (
							<ExpandMoreIcon />
						)}
					</IconButton>
				}
				title={title}
				children={children}
				{...rest}
			/>
			{divider && <Divider />}
		</>
	);
};

export default CardHeading;
