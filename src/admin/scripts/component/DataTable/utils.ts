import { orderType } from './types';

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

export function getComparator<Key extends keyof any>(
	order: orderType,
	orderBy: Key,
): (
	a: { [key in Key]: number | string },
	b: { [key in Key]: number | string },
) => number {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

export function getTypesFromData (data: any[]) {
	let list = [];

	data.map((item) => {
		let type = item.type;

		if (list.indexOf(type) < 0) list.push(type);
	});

	return list;
}

export function getSearchAttrs (attrs: string[], lang: string) {
	let na = [];

	attrs.map((attr) => {
		let ni = attr.replace('[lang]', lang);
		na.push(ni);
	});

	return na;
}
