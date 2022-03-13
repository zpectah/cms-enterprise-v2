export const PIXEL_COEFFICIENT = 0.02;
export const RESPONSIVE_BREAKPOINTS = {
	xs: 0,
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200,
	xxl: 1400,
};
export const EMAIL_REGEX =
	/^(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9.+!%-]{1,64}|)|\"[a-zA-Z0-9.+!% -]{1,64}\")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]{1,})$/;
export const DATA_TABLE = {
	rowsPerPage: [5, 10, 25, 50, 100],
	rowsDefault: 25,
	sortDefault: 'desc',
};
export const USER_LEVEL_KEYS = {
	redactor: 3,
	manager: 5,
	admin: 7,
};
export const USER_LEVEL_NAMES = {
	3: 'redactor',
	5: 'manager',
	7: 'admin',
};
export const LANGUAGE_OPTION_DEFAULT = 'cs-CZ';
export const FORM_INPUT_MIN_LENGTH = 3;
export const TOAST_TIMEOUT_SUCCESS = 3500;
export const TOAST_TIMEOUT_ERROR = 5000;
export const UPLOAD_FILE_LIMIT = 25000000;
export const UPLOAD_IMAGE_LIMIT = 10000000;
export const UPLOAD_IMAGE_CROP_OPTIONS = [
	{
		label: '1:1',
		value: 1 / 1,
	},
	{
		label: '3:2',
		value: 3 / 2,
	},
	{
		label: '4:3',
		value: 4 / 3,
	},
	{
		label: '16:9',
		value: 16 / 9,
	},
	{
		label: '2:3',
		value: 2 / 3,
	},
	{
		label: '3:4',
		value: 3 / 4,
	},
	{
		label: '9:16',
		value: 9 / 16,
	},
];
export const MAPBOX_DEFAULT_COORDS = [ -0.13235092163085938, 51.518250335096376 ]; // London
