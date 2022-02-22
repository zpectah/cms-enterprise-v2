import React from 'react';
import { useTranslation } from 'react-i18next';
import { styled, Typography } from '@mui/material';

import media from '../../../styles/responsive';

export interface FormRowBaseProps {
	required?: boolean;
	label?: string;
	id?: string;
	helpTexts?: string[];
	errors?: string[];
}

const MainRow = styled('div')`
	margin-bottom: 1.5rem;
	display: flex;
	flex-direction: column;
			
	${media.min.md} {
		flex-direction: row;
	}	
`;
const Label = styled('label')`
	padding-bottom: .25rem;
	font-size: 1rem;
	font-weight: 500;
	
	${media.min.md} {
		width: 25%;
		padding-top: .5rem;
		padding-bottom: 0;		
	}
	
`;
const InputColumn = styled('div')`
	width: 100%;
`;
const InputRow = styled('div')``;
const HelpersRow = styled('div')``;
const ErrorsRow = styled('div')``;

const FormRowBase: React.FC<FormRowBaseProps> = (props) => {
	const {
		children,
		required,
		label,
		id,
		helpTexts = [],
		errors = [],
	} = props;
	const { t } = useTranslation(['messages']);

	return (
		<MainRow>
			{label && (
				<Label htmlFor={id}>{label}{required && ' *'}</Label>
			)}
			<InputColumn>
				<InputRow>
					{children}
				</InputRow>
				{helpTexts && (
					<HelpersRow>
						{helpTexts.map((text, index) => (
							<Typography
								key={index}
								variant="caption"
							>
								{text}
							</Typography>
						))}
					</HelpersRow>
				)}
				{errors && (
					<ErrorsRow>
						{errors.map((text, index) => (
							<Typography
								key={index}
								variant="caption"
								color="error"
							>
								{t(`messages:form.${text}`)}
							</Typography>
						))}
					</ErrorsRow>
				)}
			</InputColumn>
		</MainRow>
	);
};

export default FormRowBase;