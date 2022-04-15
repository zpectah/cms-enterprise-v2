<template>
	<form
		name="MemberProfileForm"
	>
		MemberProfileForm: ... {{t('common:btn.close')}}
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