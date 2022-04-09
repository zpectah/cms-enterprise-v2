import { createApp } from 'vue';

import demoComponent from './component/demoComponent';

createApp({
	components: {
		'demo-component': demoComponent,
	},
	mixins: [],
	data() {
		return {
			globalValue: 'ABC',
		}
	},
	mounted() {
		console.log('Vue app loaded');
	},
	computed: {},
	methods: {},
}).mount('#vue-app');
