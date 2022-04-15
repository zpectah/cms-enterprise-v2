<template>
	<form
		name="MemberProfileForm"
	>
		MemberProfileForm: ... {{t('common:btn.close')}}
	</form>
</template>

<script>
const _ = require('lodash');
const { EMAIL_REGEX } = require('../../constants');
const { get, post } = require('../../utils/http');
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
			state: {
				process: false, // ... for submitting
				loading: false, // .. for load
				valid: false,
				errors: {},
				formError: false,
				formMessage: '',
			},
		}
	},
	methods: {
		formValidHandler: (model) => {

			return true;
		},
		submitHandler: function (e) {
			e.preventDefault();
			const self = this;
			this.state.process = true;
			this.state.formError = false;
			this.state.formMessage = '';
			const master = _.cloneDeep(this.model);

			console.log('model on submit', master);
			setTimeout(() => {
				self.state.process = false;
				self.state.formError = true;
				self.state.formMessage = '... some form error';
			}, 1000);
		},
	},
};
</script>

<style scoped>

</style>