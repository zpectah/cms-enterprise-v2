import { createApp } from 'vue';

import {
	loadTranslations,
	getTranslationFromKey,
} from './utils/translations';
import Cookiebot from './component/Cookiebot';
import ContactForm from './component/ContactForm';
import Rating from './component/Rating';
import MenuToggle from './component/MenuToggle';
import { DebugBar } from './component/DebugBar';
import { Comments } from './component/Comments';
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
		'comments': Comments,
		'rating': Rating,
		'debug-bar': DebugBar,
		'menu-toggle': MenuToggle,
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
			translationsLoaded: false,
			// appToken: window.APP_TOKEN,
			// memberToken: window.MEMBER_TOKEN,
			// env: window.APP_ENV,
		}
	},
	mounted() {
		loadTranslations(this.lang).then((resp) => {
			this.translations = resp;
			this.translationsLoaded = true;
		});
	},
	computed: {},
	methods: {
		t: function (key) {
			return getTranslationFromKey(this.translations, key);
		}
	},
}).mount('#vue-scope');

