import { storage } from '../../../../utils/helpers';
import { STORAGE_RATING_NAME } from '../constants';

export const isVoted = (model, id) => {
	let voted = false;
	const c = storage.get(STORAGE_RATING_NAME);
	const cp = c ? JSON.parse(c) : null;
	if (cp) {
		if (cp[model]) {
			if (cp[model].indexOf(id) > -1) voted = true;
		}
	}

	return voted;
};

export const setVoted = (model, id) => {
	let updated = false;
	if (model && id) {
		const c = storage.get(STORAGE_RATING_NAME);
		const cp = c ? JSON.parse(c) : {};
		let pa;
		if (cp[model]) {
			let arr = cp[model];
			if (!(arr.indexOf(id) > -1)) arr.push(id);
			cp[model] = arr;
			pa = cp;
		} else {
			cp[model] = [ id ];
			pa = cp;
		}
		if (pa) storage.set(STORAGE_RATING_NAME, JSON.stringify(pa));
		updated = true;
	}

	return updated;
};