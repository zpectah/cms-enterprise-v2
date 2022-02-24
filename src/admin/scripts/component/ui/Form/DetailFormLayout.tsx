import React from 'react';
import { styled, Stack } from '@mui/material';

import FormBase, { FormBaseProps } from './Form.Base';

export interface DetailFormLayoutProps extends FormBaseProps {
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
}));
const FormSidebar = styled('div')(({ theme }) => ({
	width: '250px',
	marginLeft: theme.spacing(3),
	paddingLeft: theme.spacing(3),
	paddingRight: theme.spacing(3),
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
			<FormBase {...rest}>
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
			</FormBase>
			{addonsNode && (
				<FormAddons children={addonsNode} />
			)}
		</FormOuter>
	);
};

export default DetailFormLayout;
