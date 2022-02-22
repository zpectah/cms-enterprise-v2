import React, { useEffect } from 'react';
import { styled } from '@mui/material';

import palette from '../../styles/palette';
import { toastItemProps } from '../../types/common';
import { CloseIconButton } from '../ui';

export interface ToastItemProps extends toastItemProps {}

const Toast = styled('div')(({ context }:{ context: toastItemProps['context'] }) => `
	width: auto;
	height: auto;
	margin-bottom: .5rem;
	padding: 1rem 2rem 1rem 1rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	position: relative;
	border-radius: .35rem;
	color: ${palette.light};
	background-color: ${context === 'success' ? palette.green : context === 'error' ? palette.red : palette.anthracite};	
`);
const ToastInner = styled('div')`
	display: column;
	flex-direction: row;
	align-items: center;
`;
const ToastTitle = styled('p')`
	margin: 0;
	padding: 0;
`;
const ToastContent = styled('small')``;

const ToastItem = (props: ToastItemProps) => {
	const {
		onRemove,
		id,
		title,
		content,
		context = 'default',
		timeout,
	} = props;

	useEffect(() => {
		if (timeout) setTimeout(() => onRemove(id), timeout);
	}, [ id, timeout ]);

	return (
		<Toast
			context={context}
		>
			<ToastInner>
				<ToastTitle>
					{title}
				</ToastTitle>
				{content && (
					<ToastContent>
						{content}
					</ToastContent>
				)}
			</ToastInner>
			<CloseIconButton
				onClick={() => onRemove(id)}
				sx={{
					position: 'absolute',
					top: 2,
					right: 2,
				}}
			/>
		</Toast>
	);
};

export default ToastItem;
