import { date } from '../../../../../utils/helpers';
import { PostsItemProps } from '../../types/model';

const today = date.getTodayObject();

export default {
	id: 'new',
	type: 'article',
	name: '',
	categories: [],
	tags: [],
	event_start: null,
	event_end: null,
	event_location: [ 0, 0 ],
	event_address: '',
	event_city: '',
	event_country: '',
	event_zip: '',
	attachments: [],
	media: [],
	links: [],
	img_main: '',
	img_thumbnail: '',
	published: `${today.year}-${today.month}-${today.day}T00:00:00.000+01:00`,
	author: 1, // Must be (1) !!!
	rating: 0,
	template: false,
	active: true,
	lang: {},
} as PostsItemProps;
