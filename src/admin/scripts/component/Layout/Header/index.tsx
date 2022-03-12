import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, Stack } from '@mui/material';

import config from '../../../config';
import palette from '../../../styles/palette';
import { HEADER_HEIGHT } from '../../../styles/variables';
import useSettings from '../../../hooks/useSettings';
import SidebarToggle from '../../SidebarToggle';
import ProfileDropdown from '../../../module/Profile/ProfileDropdown';

const Wrapper = styled('header')`
	width: 100vw;
	height: ${HEADER_HEIGHT};
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 0;
	left: 0;
	color: ${palette.light};
	background-color: ${palette.anthracite};
	border-bottom: 1px solid rgba(150,150,150,.35);
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

const Header = () => {
	const navigate = useNavigate();
	const { settings } = useSettings();
	const projectName = settings?.project_name ? settings?.project_name : config.project.web.meta.title;

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
						<small>{projectName}</small>
					</BrandBlock>
					<SecondaryBlock>
						<ProfileDropdown />
					</SecondaryBlock>
				</StyledStack>
			</Wrapper>
		</>
	);
};

export default Header;
