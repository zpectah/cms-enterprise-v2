import React from 'react';
import { styled } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface MenuTriggerProps {
	label: string;
	open: boolean;
	onClick: () => void;
	ariaControls?: string | undefined;
	ariaExpanded?: boolean | 'true' | 'false' | undefined;
	ariaHaspopup?: boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | undefined;
}

const TriggerElement = styled('a')`
	padding: .25rem .5rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	align-content: center;
	justify-content: center;
	font-size: .85rem;
	cursor: pointer;
	border: 1px solid rgba(175,175,175,.5);
	border-radius: 4px;
		
	& > span{
		margin-left: .35rem;
		display: flex;
		font-size: 1rem;
	}
`;

const MenuTrigger = (props: MenuTriggerProps) => {
	const {
		label,
		open,
		ariaControls,
		ariaExpanded,
		ariaHaspopup,
		...rest
	} = props;
	
	return (
		<TriggerElement
			aria-controls={ariaControls}
			aria-expanded={ariaExpanded}
			aria-haspopup={ariaHaspopup}
			{...rest}
		>
			{label}
			<span
				className="icon"
			>
					{open ? (
						<ExpandLessIcon fontSize="inherit" />
					) : (
						<ExpandMoreIcon fontSize="inherit" />
					)}
			</span>
		</TriggerElement>
	);
};

export default MenuTrigger;
