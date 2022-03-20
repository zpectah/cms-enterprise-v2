import transformString from './transformString';

export default (
	items: any[],
	itemId: number,
	key: string,
	value: string,
) => {
	let is_duplicates = false;
	items?.map((item) => {
		if (
			(item[key] == value || item[key] == transformString(value, 'empty-to-dash')) &&
			item.id !== itemId
		) is_duplicates = true;
	});

	return is_duplicates;
};