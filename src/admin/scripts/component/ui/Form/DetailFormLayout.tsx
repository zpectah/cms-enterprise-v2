import React from 'react';
import { styled, Stack } from '@mui/material';

import FormBase, { FormBaseProps } from './Form.Base';
import {
	FormOuter,
	FormInner,
	FormBody,
	FormContent,
	FormSidebar,
	FormActions,
	FormAddons,
} from './detailFormLayoutElements';

export interface DetailFormLayoutProps extends FormBaseProps {
	sidebarNode?: React.ReactNode;
	actionsNode?: React.ReactNode;
	addonsNode?: React.ReactNode;
}

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
