<template>
	<div
		v-if="cookieShow"
		class="Cookiebot"
	>
		<div
			class="Cookiebot-content"
		>
			{{t('cookiebot:description')}}
		</div>
		<div
			class="Cookiebot-actions"
		>
			<button
				type="button"
				class="ui-btn success outline"
				@click="acceptHandler"
			>
				{{t('common:btn.accept')}}
			</button>
			&nbsp;
			<button
				type="button"
				class="ui-btn warning outline"
				@click="declineHandler"
			>
				{{t('common:btn.decline')}}
			</button>
		</div>
	</div>
</template>

<script>
import { cookies } from '../../../../utils/helpers';
import { EU_COOKIES_COOKIE_NAME } from '../constants';

export default {
	props: {},
	mounted() {
		const euc = cookies.get(EU_COOKIES_COOKIE_NAME);
		if (!euc) this.cookieShow = true;
	},
	data() {
		return {
			count: 0,
			globalValue: this.$root.globalValue,
			cookieShow: false,
			t: this.$root.t,
		}
	},
	methods: {
		acceptHandler: function () {
			this.cookieShow = false;
			cookies.set(
				EU_COOKIES_COOKIE_NAME,
				JSON.stringify({ session: true, permanent: true, browser: true }),
				365,
			);
		},
		declineHandler: function () {
			this.cookieShow = false;
			cookies.set(EU_COOKIES_COOKIE_NAME, false, -1);
		},
	},
};
</script>

<style scoped>

</style>