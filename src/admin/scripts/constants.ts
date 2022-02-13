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
	rowHeightDefault: 55,
	sortDefault: 'asc',
};
export const USER_LEVEL_KEYS = {
	none: 0,
	redactor: 2,
	chief_redactor: 3,
	admin: 5,
	super_admin: 7,
};
export const USER_LEVEL_NAMES = {
	0: 'none',
	2: 'redactor',
	3: 'chief_redactor',
	5: 'admin',
	7: 'super_admin',
};
