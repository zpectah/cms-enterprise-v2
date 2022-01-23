import CSSObject from '@mui/styled-engine-sc';

const globalStyles: CSSObject = {
	'.no-script-dialog': {
		width: '100%',
		height: '100vh',
		minHeight: '500px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',

		'& .dialog-message': {
			fontSize: '.85rem',
		},
	},
	'#App': {
		width: '100%',
		height: '100vh',
		minHeight: '500px',
	},
};

export default globalStyles;
