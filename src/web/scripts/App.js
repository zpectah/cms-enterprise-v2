import Vue from 'vue';

import demoComponent from './component/demoComponent';

new Vue({
	el: '#vue-app',
	mixins: [],
	components: {
		'demo-component': demoComponent,
	},
	mounted: function () {},
	data: function () {
		return {};
	},
	computed: {},
	methods: {},
});
