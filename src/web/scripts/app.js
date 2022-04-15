import { createApp } from 'vue';

import {
	loadTranslations,
	getTranslationFromKey,
} from './utils/translations';
import {
	MemberSubscriptionForm,
	MemberLoginForm,
	MemberLostPasswordForm,
	MemberProfileForm,
	MemberRegistrationForm,
} from './component/Member';

createApp({
	components: {
		'member-subscription-form': MemberSubscriptionForm,
		'member-login-form': MemberLoginForm,
		'member-lost-password-form': MemberLostPasswordForm,
		'member-profile-form': MemberProfileForm,
		'member-registration-form': MemberRegistrationForm,
	},
	mixins: [],
	data() {
		return {
			globalValue: 'ABC',
			lang: window.APP_LANG,
			translations: {},
			// appToken: window.APP_TOKEN,
			// memberToken: window.MEMBER_TOKEN,
			// env: window.APP_ENV,
		}
	},
	mounted() {
		loadTranslations(this.lang).then((resp) => this.translations = resp);
	},
	computed: {},
	methods: {
		t: function (key) {
			return getTranslationFromKey(this.translations, key);
		}
	},
}).mount('#vue-app');
