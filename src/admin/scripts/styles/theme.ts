import { createTheme } from '@mui/material/styles';

import { themeListProps } from '../types/common';
import palette from './palette';

const BaseTheme = (theme: themeListProps) =>
	createTheme({
		palette: {
			mode: theme,
			primary: {
				main: palette.veryPeri,
				contrastText: palette.white,
			},
			// secondary: {
			// 	main: palette.anthracite,
			// 	contrastText: palette.white,
			// },
		},
		typography: {
			h1: {
				fontSize: '2.125rem',
				fontWeight: 700,
			},
			h2: {
				fontSize: '2rem',
				fontWeight: 500,
			},
			h3: {
				fontSize: '1.75rem',
				fontWeight: 700,
			},
			h4: {
				fontSize: '1.5rem',
				fontWeight: 500,
			},
			h5: {
				fontSize: '1.25rem',
				fontWeight: 700,
			},
			h6: {
				fontSize: '1.125rem',
				fontWeight: 500,
			},
		},
	});

export default BaseTheme;
