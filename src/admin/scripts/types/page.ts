import { ContainerProps } from '@mui/material/Container';

export interface pageMetaProps {
	key: string;
	title: string;
	description: string;
}

export interface pageLayoutProps {
	meta: pageMetaProps;
	containerMaxWidth?: ContainerProps['maxWidth'];
	withFooter?: boolean;
}
