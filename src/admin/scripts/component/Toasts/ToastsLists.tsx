import React from 'react';
import { styled } from '@mui/material';

import ToastItem, { ToastItemProps } from './ToastItem';

export interface ToastsListsProps {
	items: ToastItemProps[];
	onRemove: (id: string) => void;
}

const Wrapper = styled('div')`
	width: 300px;
	height: auto;
	position: fixed;
	overflow: visible;
	right: 1rem;
	bottom: .5rem;
	z-index: 1995;	
`;
const Inner = styled('div')``;

const ToastsLists = (props: ToastsListsProps) => {
	const {
		items = [],
		onRemove,
	} = props;

	return (
		<Wrapper>
			<Inner>
				{items.map((toast) => (
					<ToastItem
						key={toast.id}
						onRemove={onRemove}
						{...toast}
					/>
				))}
			</Inner>
		</Wrapper>
	);
};

export default ToastsLists;
