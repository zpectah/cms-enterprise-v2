<template>
	<button
		type="button"
		class="btn btn-outline-primary"
		@click="logoutHandler"
	>
		{{t('common:btn.log-out')}}
	</button>
</template>

<script>
import { post } from '../../utils/http';

export default {
	props: {
		path: {
			type: String,
			default: '',
		}
	},
	data() {
		return {
			t: this.$root.t,
		}
	},
	methods: {
		logoutHandler: function (e) {
			e.preventDefault();
			return post('/api/member_logout').then(() => {
				window.location.href = this.path;
			});
		},
	},
};
</script>

<style scoped>

</style>