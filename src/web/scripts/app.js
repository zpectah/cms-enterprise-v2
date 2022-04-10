import { createApp } from 'vue';

import MemberSubscriptionForm from './component/MemberSubscriptionForm';
import MemberLoginForm from './component/MemberLoginForm';

createApp({
	components: {
		'member-subscription-form': MemberSubscriptionForm,
		'member-login-form': MemberLoginForm,
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
