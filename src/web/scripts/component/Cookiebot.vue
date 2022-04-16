<template>
	<div
		v-if="cookieShow"
		class="Cookiebot"
	>
		<div
			class="Cookiebot-content"
		>
			{{t('cookies:cookiebot.description')}}
		</div>
		<div
			class="Cookiebot-actions"
		>
			<button
				type="button"
				class="btn btn-success"
				@click="acceptHandler"
			>
				{{t('cookies:cookiebot.btn.accept')}}
			</button>
			&nbsp;
			<button
				type="button"
				class="btn btn-warning"
				@click="declineHandler"
			>
				{{t('cookies:cookiebot.btn.decline')}}
			</button>
		</div>
	</div>
</template>

<script>
const { cookies } = require('../../../../utils/helpers');
const { EU_COOKIES_COOKIE_NAME } = require('../constants');

module.exports = {
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