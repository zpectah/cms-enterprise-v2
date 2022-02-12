import React from 'react';
import { useTranslation } from 'react-i18next';
import { Stack, styled } from '@mui/material';

import media from '../../../styles/responsive';

export interface FormRowBaseProps {
	required?: boolean;
	label?: string;
	id?: string;
	helpTexts?: string[];
	errors?: string[];
}

const MainRow = styled('div')`
	margin-bottom: 1rem;
	display: flex;
	flex-direction: column;
			
	${media.min.md} {
		flex-direction: row;
	}	
`;
const Label = styled('label')`
	padding-bottom: .25rem;
	font-size: .9rem;
	font-weight: 600;
	
	${media.min.md} {
		width: 250px;
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
							<div key={index}>{text}</div>
						))}
					</HelpersRow>
				)}
				{errors && (
					<ErrorsRow>
						{errors.map((text, index) => (
							<div key={index}>{t(`messages:form.${text}`)}</div>
						))}
					</ErrorsRow>
				)}
			</InputColumn>
		</MainRow>
	);
};

export default FormRowBase;