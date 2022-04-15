<template>
	<form
		name="MemberLostPasswordForm"
	>
		<div class="mb-3">
			<ui-input
				id="MemberLostPasswordForm_email"
				label="Your e-mail"
				placeholder="Your e-mail"
				v-model="model.email"
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
				email: ''
			},
		}
	}
};
</script>

<style scoped>

</style>