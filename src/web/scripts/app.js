import { createApp } from 'vue';

import { loadTranslations, getTranslationFromKey } from './utils/translations';
import MemberSubscriptionForm from './component/MemberSubscriptionForm';
import MemberLoginForm from './component/MemberLoginForm';
import MemberLostPasswordForm from './component/MemberLostPasswordForm';
import MemberProfileForm from './component/MemberProfileForm';
import MemberRegistrationForm from './component/MemberRegistrationForm';

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
