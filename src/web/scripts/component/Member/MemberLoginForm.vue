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
				:error="state.errors.email"
			/>
		</div>
		<div class="mb-3">
			<ui-input
				id="MemberLoginForm_password"
				label="Your password"
				placeholder="Your password"
				v-model="model.password"
				:error="state.errors.password"
			/>
		</div>
		<div
			v-if="state.formMessage"
			class="alert"
			:class="state.formError ? 'alert-danger' : 'alert-success'"
			role="alert"
		>
			{{state.formMessage}}
		</div>
		<div>
			<button
				type="button"
				class="btn btn-primary"
				@click="submitHandler"
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
				email: '',
				password: '',
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
		formValidHandler: function (model) {
			let valid = true;
			const errors = {};

			if (model.email === '' || model.email.length < 3 || !model.email.match(EMAIL_REGEX)) {
				valid = false;
				if (!model.email.match(EMAIL_REGEX)) {
					errors['email'] = this.t('message.input.email_format');
				} else {
					errors['email'] = this.t('message.input.required');
				}
			}

			console.log('form validator', errors, model);
			this.state.errors = errors;
			this.state.valid = valid;
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
	watch: {
		'model': {
			handler: function (nv, ov) {
				this.formValidHandler(nv);
			},
			deep: true,
		},
	},
};
</script>

<style scoped>

</style>