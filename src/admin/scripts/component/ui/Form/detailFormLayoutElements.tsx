import { styled } from '@mui/material';

export const FormOuter = styled('div')`
	width: 100%;
`;
export const FormInner = styled('div')``;
export const FormBody = styled('div')`
	display: flex;
	flex-direction: row;
`;
export const FormContent = styled('div')(({ theme }) => ({
	display: 'flex',
	flexGrow: 1,
	flexFlow: 'column',
}));
export const FormSidebar = styled('div')(({ theme }) => ({
	width: '250px',
	marginLeft: theme.spacing(3),
	paddingLeft: theme.spacing(3),
	paddingRight: theme.spacing(3),
}));
export const FormActions = styled('div')(({ theme }) => `
	padding-top: ${theme.spacing(3)};
`);
export const FormAddons = styled('div')(({ theme }) => `
	padding-top: ${theme.spacing(3)};
`);
