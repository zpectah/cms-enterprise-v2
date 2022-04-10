import { createApp } from 'vue';

// import demoComponent from './component/demoComponent';
import MemberSubscriptionForm from './component/MemberSubscriptionForm';

createApp({
	components: {
		// 'demo-component': demoComponent,
		'member-subscription-form': MemberSubscriptionForm,
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
