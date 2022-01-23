import { ContainerProps } from '@mui/material/Container';

export interface pageMetaProps {
	route: string | null;
	key: string;
	title: string;
	description: string;
}

export interface pageLayoutProps {
	meta: pageMetaProps;
	containerMaxWidth?: ContainerProps['maxWidth'];
	withFooter?: boolean;
}

export interface routesProps {
	[k: string]: pageMetaProps;
}
