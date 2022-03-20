import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import styled from '@emotion/styled';

import { getTestDataAttr } from '../../../utils';

const ButtonLabel = styled.span<{ isLoading: boolean }>`
	flex: none;
	display: flex;
	white-space: nowrap;
	opacity: ${(props) => (props.isLoading ? '.125' : '1')};
`;
const StyledProgress = styled(CircularProgress)`
	position: absolute;
	top: calc(50% - 0.7rem);
	left: calc(50% - 0.7rem);
`;

export interface ButtonBaseProps extends ButtonProps {
	dataId?: string;
	loading?: boolean;
}

const ButtonBase: React.FC<ButtonBaseProps> = (props) => {
	const {
		children,
		dataId = 'button-base',
		loading,
		...rest
	} = props;

	return (
		<Button
			{...rest}
			{...getTestDataAttr(dataId)}
		>
			{loading && <StyledProgress size={'1.3rem'} color="inherit" />}
			<ButtonLabel isLoading={loading}>{children}</ButtonLabel>
		</Button>
	);
};

export default ButtonBase;