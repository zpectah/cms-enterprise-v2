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
			secondary: {
				main: palette.deepTaupe,
				contrastText: palette.white,
			},
		},
	});

export default BaseTheme;
