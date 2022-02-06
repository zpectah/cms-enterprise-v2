import React from 'react';
import { styled, Stack, Box, Paper } from '@mui/material';

import Form, { FormProps } from './Form';

interface DetailFormLayoutProps extends FormProps {
	sidebarNode?: React.ReactNode;
	actionsNode?: React.ReactNode;
	addonsNode?: React.ReactNode;
}

const FormOuter = styled('div')`
	width: 100%;
`;
const FormInner = styled('div')``;
const FormBody = styled('div')`
	display: flex;
	flex-direction: row;
`;
const FormContent = styled('div')(({ theme }) => ({
	display: 'flex',
	flexGrow: 1,
	flexFlow: 'column',
	// padding: theme.spacing(2),
}));
const FormSidebar = styled(Paper)(({ theme }) => ({
	width: '250px',
	marginLeft: theme.spacing(3),
	padding: theme.spacing(3),
	// color: theme.palette.text.secondary,
}));
const FormActions = styled('div')``;
const FormAddons = styled('div')``;

const DetailFormLayout: React.FC<DetailFormLayoutProps> = (props) => {
	const {
		children,
		sidebarNode,
		actionsNode,
		addonsNode,
		...rest
	} = props;

	return (
		<FormOuter>
			<Form {...rest}>
				<FormInner>
					<FormBody>
						<FormContent children={children} />
						<FormSidebar children={sidebarNode} />
					</FormBody>
					<FormActions children={
						<Stack
							direction="row"
							spacing={2}
							children={actionsNode}
						/>
					} />
				</FormInner>
			</Form>
			{addonsNode && (
				<FormAddons children={addonsNode} />
			)}
		</FormOuter>
	);
};

export default DetailFormLayout;
