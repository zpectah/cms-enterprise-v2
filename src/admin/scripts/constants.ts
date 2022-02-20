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
