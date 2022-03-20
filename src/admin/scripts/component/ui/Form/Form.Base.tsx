import React from 'react';
import { Alert } from '@mui/material';

import { Section } from '../Section';
import { getTestDataAttr } from '../../../utils';

export interface FormBaseProps extends React.HTMLProps<HTMLFormElement>, React.HTMLAttributes<HTMLFormElement> {
	dataId?: string;
	error?: string;
	actionsNode?: React.ReactNode;
}

const FormBase: React.FC<FormBaseProps> = (props) => {
	const {
		children,
		dataId = 'form-base',
		actionsNode,
		error,
		style = {
			width: '100%',
		},
		...rest
	} = props;

	return (
		<form
			noValidate
			autoComplete="off"
			style={style}
			{...rest}
			{...getTestDataAttr(dataId)}
		>
			<>
				{children}
			</>
			{error && (
				<Section>
					<Alert
						severity="error"
					>
						{error}
					</Alert>
				</Section>
			)}
			{actionsNode && (
				<Section>
					{actionsNode}
				</Section>
			)}
		</form>
	);
};

export default FormBase;