import { ContainerProps } from '@mui/material/Container';

export interface pageMetaProps {
	path: string | null;
	key: string;
	label?: string;
	title: string;
	description?: string;
	auth: number;
}

export interface pageLayoutProps {
	meta: pageMetaProps;
	containerMaxWidth?: ContainerProps['maxWidth'];
	withFooter?: boolean;
}

export interface routesProps {
	[k: string]: pageMetaProps;
}
