import React from 'react';
import { Stack } from '@mui/material';
import { styled } from '@mui/material';

import Form, { FormProps } from './Form';

interface DetailFormLayoutProps extends FormProps {
	sidebarNode?: React.ReactNode;
	actionsNode?: React.ReactNode;
	addonsNode?: React.ReactNode;
}

const FormOuter = styled('div')``;
const FormInner = styled('div')``;
const FormBody = styled('div')`
	display: flex;
	flex-direction: row;
`;
const FormContent = styled('div')``;
const FormSidebar = styled('div')``;
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
