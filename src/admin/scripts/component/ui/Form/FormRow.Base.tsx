import React from 'react';
import { useTranslation } from 'react-i18next';
import {
	styled,
	Typography,
	Grid,
	GridProps,
} from '@mui/material';

import { string } from '../../../../../../utils/helpers';
import media from '../../../styles/responsive';

export interface FormRowBaseProps {
	required?: boolean;
	label?: string;
	emptyLabel?: boolean;
	id?: string;
	helpTexts?: string[];
	errors?: string[];
	render?: (id: string) => React.ReactNode;
	wrapperProps?: GridProps;
	labelColumnProps?: GridProps;
	inputColumnProps?: GridProps;
}

const StyledGridItem = styled(Grid)`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
`;
const Label = styled('label')`
	padding-top: 0;
	font-size: 1rem;
	font-weight: 500;
	
	${media.min.md} {
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
const TextItem = styled('div')`
	padding-left: .75rem;
	color: rgb(150,150,150);
`;

const FormRowBase: React.FC<FormRowBaseProps> = (props) => {
	const {
		children,
		required,
		label,
		emptyLabel,
		id,
		helpTexts = [],
		errors = [],
		render,
		wrapperProps = {
			spacing: 2,
			sx: {
				mb: 2.5,
			},
		},
		labelColumnProps,
		inputColumnProps,
	} = props;

	const { t } = useTranslation(['messages']);

	const inputId = id ? id : string.getToken(2, '');
	const labelVisible = label || emptyLabel;
	const gridColumns = {
		label: {
			xs: 12,
			sm: 5,
			md: 4,
			lg: 3,
		},
		input: {
			xs: 12,
			sm: labelVisible ? 7 : 12,
			md: labelVisible ? 8 : 12,
			lg: labelVisible ? 9 : 12,
		},
	};

	return (
		<Grid
			container
			{...wrapperProps}
		>
			{labelVisible && (
				<StyledGridItem
					item
					{...gridColumns.label}
					{...labelColumnProps}
				>
					<Label
						htmlFor={inputId}
					>
						{label}{required && ' *'}
					</Label>
				</StyledGridItem>
			)}
			<StyledGridItem
				item
				{...gridColumns.input}
				{...inputColumnProps}
			>
				<InputColumn>
					<InputRow>
						{render ? render(inputId) : children}
					</InputRow>
					{helpTexts && (
						<HelpersRow>
							{helpTexts.map((text, index) => (
								<TextItem
									key={index}
								>
									<Typography
										variant="caption"
									>
										{text}
									</Typography>
								</TextItem>
							))}
						</HelpersRow>
					)}
					{errors && (
						<ErrorsRow>
							{errors.map((text, index) => (
								<TextItem
									key={index}
								>
									<Typography
										variant="caption"
										color="error"
									>
										{t(`messages:form.${text}`)}
									</Typography>
								</TextItem>
							))}
						</ErrorsRow>
					)}
				</InputColumn>
			</StyledGridItem>
		</Grid>
	);
};

export default FormRowBase;