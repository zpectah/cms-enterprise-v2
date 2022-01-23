import React from 'react';
import Stack from '@mui/material/Stack';
import styled from '@emotion/styled';

import { HEADER_HEIGHT } from '../../../styles/variables';
import SidebarToggle from '../../SidebarToggle';
import ThemeToggle from '../../ThemeToggle';
import LanguageToggle from '../../LanguageToggle';

interface HeaderProps {}

const Wrapper = styled('header')`
	width: 100vw;
	height: ${HEADER_HEIGHT};
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 0;
	left: 0;
	
	background-color: rgba(200,200,200,.25);
`;
const StyledStack = styled(Stack)`
	width: 100%;
	padding-left: 1rem;
	padding-right: 1rem;
`;
const Block = styled('div')`
	width: auto;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const PrimaryBlock = styled(Block)``;
const BrandBlock = styled(Block)``;
const SecondaryBlock = styled(Block)``;

const Header = (props: HeaderProps) => {
	const {} = props;

	return (
		<>
			<Wrapper>
				<StyledStack spacing={2} direction="row" justifyContent="space-between" alignItems="center">
					<PrimaryBlock>
						<SidebarToggle />
					</PrimaryBlock>
					<BrandBlock>
						Logo
					</BrandBlock>
					<SecondaryBlock>
						<LanguageToggle />
						<ThemeToggle />
						User
					</SecondaryBlock>
				</StyledStack>
			</Wrapper>
		</>
	);
};

export default Header;