import React from 'react';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import styled from '@emotion/styled';

import getTestDataAttr from '../../../utils/getTestDataAttr';

export interface IconButtonBaseProps extends IconButtonProps {
	dataId?: string;
	loading?: boolean;
}

const ButtonLabel = styled.span<{ isLoading: boolean }>`
	opacity: ${(props) => (props.isLoading ? '.125' : '1')};
`;
const StyledProgress = styled(CircularProgress)`
	position: absolute;
	top: calc(50% - 0.7rem);
	left: calc(50% - 0.7rem);
`;

const IconButtonBase: React.FC<IconButtonBaseProps> = (props) => {
	const {
		children,
		dataId = 'icon-button-base',
		loading,
		...rest
	} = props;

	return (
		<IconButton
			{...rest}
			{...getTestDataAttr(dataId)}
		>
			{loading && <StyledProgress size={'1.3rem'} color="inherit" />}
			<ButtonLabel isLoading={loading}>{children}</ButtonLabel>
		</IconButton>
	);
};

export default IconButtonBase;