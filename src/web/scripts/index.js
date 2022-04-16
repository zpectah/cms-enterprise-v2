import { createApp } from 'vue';

import {
	loadTranslations,
	getTranslationFromKey,
} from './utils/translations';
import Cookiebot from './component/Cookiebot';
import ContactForm from './component/ContactForm';
import CommentsList from './component/CommentsList';
import {
	MemberSubscriptionForm,
	MemberLoginForm,
	MemberLostPasswordForm,
	MemberNewPasswordForm,
	MemberProfileForm,
	MemberRegistrationForm,
	MemberLogoutLink,
} from './component/Member';

createApp({
	components: {
		'cookie-bot': Cookiebot,
		'contact-form': ContactForm,
		'comments-list': CommentsList,
		'member-subscription-form': MemberSubscriptionForm,
		'member-login-form': MemberLoginForm,
		'member-lost-password-form': MemberLostPasswordForm,
		'member-new-password-form': MemberNewPasswordForm,
		'member-profile-form': MemberProfileForm,
		'member-registration-form': MemberRegistrationForm,
		'member-logout-link': MemberLogoutLink,
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
}).mount('#vue-scope');

