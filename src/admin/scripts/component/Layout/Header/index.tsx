import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, Stack } from '@mui/material';

import config from '../../../config';
import palette from '../../../styles/palette';
import { HEADER_HEIGHT } from '../../../styles/variables';
import SidebarToggle from '../../SidebarToggle';
import UserDrawer from '../../UserDrawer';

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

	color: ${palette.light};
	background-color: ${palette.veryPeri};
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
const BrandBlock = styled(Block)`
	flex-direction: column;
	cursor: pointer;
	
	& span{
		display: block;
		font-size: .9rem;
		font-weight: 700;
	}
	& small{
		display: block;
		font-size: .7rem;
		opacity: .75;
	}
`;
const SecondaryBlock = styled(Block)``;

const Header = (props: HeaderProps) => {
	const {} = props;
	const navigate = useNavigate();

	return (
		<>
			<Wrapper>
				<StyledStack
					spacing={1}
					direction="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<PrimaryBlock>
						<SidebarToggle />
					</PrimaryBlock>
					<BrandBlock onClick={() => navigate('/admin/app/')}>
						<span>{config.project.meta.name}</span>
						<small>{config.project.web.meta.title}</small>
					</BrandBlock>
					<SecondaryBlock>
						<UserDrawer />
					</SecondaryBlock>
				</StyledStack>
			</Wrapper>
		</>
	);
};

export default Header;
