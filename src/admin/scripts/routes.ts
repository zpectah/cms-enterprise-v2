import { routesProps } from './types/page';

export default {
	error: {
		route: null,
		key: 'error',
		title: 'Error page',
		description: 'Description of page ...',
	},
	home: {
		route: '',
		key: 'home',
		title: 'Home page',
		description: 'Description of page ...',
	},
	login: {
		route: 'login',
		key: 'login',
		title: 'Login page',
		description: 'Description of page ...',
	},
	lostPassword: {
		route: 'lost-password',
		key: 'lostPassword',
		title: 'Lost password page',
		description: 'Description of page ...',
	},
	dashboard: {
		route: '',
		key: 'dashboard',
		title: 'Dashboard page',
		description: 'Description of page ...',
	},
	users: {
		route: 'users',
		key: 'users',
		title: 'Users page',
		description: 'Description of page ...',
	},
} as routesProps;