<template>
	<form
		name="MemberLoginForm"
	>
		<div class="mb-3">
			<ui-input
				id="MemberLoginForm_email"
				label="Your e-mail"
				placeholder="Your e-mail"
				v-model="model.email"
			/>
		</div>
		<div class="mb-3">
			<ui-input
				id="MemberLoginForm_password"
				label="Your password"
				placeholder="Your password"
				v-model="model.password"
			/>
		</div>
		<div>
			<button
				type="submit"
				class="btn btn-primary"
			>
				{{t('common:btn.submit')}}
			</button>
		</div>
		<pre>
			<code>
				{{model}}
			</code>
		</pre>
	</form>
</template>

<script>
const _ = require('lodash');
const { UiInput } = require('../ui');

module.exports = {
	components: {
		'ui-input': UiInput,
	},
	props: {},
	data() {
		return {
			t: this.$root.t,
			model: {
				email: '',
				password: '',
			},
		}
	}
};
</script>

<style scoped>

</style>