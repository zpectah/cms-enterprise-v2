<template>
	<form
		name="MemberProfileForm"
	>
		<div class="mb-3">
			<ui-input
				id="MemberProfileForm_name_first"
				label="First name"
				placeholder="First name"
				v-model="model.name_first"
				:error="errors.name_first"
			/>
		</div>
		<div class="mb-3">
			<ui-input
				id="MemberProfileForm_name_last"
				label="Last name"
				placeholder="Last name"
				v-model="model.name_last"
				:error="errors.name_last"
			/>
		</div>
		<div class="mb-3">
			<ui-input
				type="email"
				id="MemberProfileForm_email"
				label="Your e-mail"
				placeholder="Your e-mail"
				v-model="model.email"
				:error="errors.email"
				:disabled="true"
			/>
		</div>
		<div class="mb-3">
			<ui-input
				type="password"
				id="MemberProfileForm_password"
				label="New Password"
				placeholder="New Password"
				v-model="model.password"
				:error="errors.password"
			/>
		</div>
		<div class="mb-3">
			<ui-checkbox
				id="MemberProfileForm_subscription"
				label="Subscription"
				v-model:checked="model.subscription"
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
				:disabled="!state.valid || state.process"
			>
				{{t('common:btn.submit')}}
			</button>
		</div>
	</form>
</template>

<script>
const _ = require('lodash');
const { EMAIL_REGEX } = require('../../constants');
const { get, post } = require('../../utils/http');
const { UiInput, UiCheckbox } = require('../ui');

const formModel = {
	name_first: '',
	name_last: '',
	email: '',
	password: '',
	subscription: true,
};

module.exports = {
	components: {
		'ui-input': UiInput,
		'ui-checkbox': UiCheckbox,
	},
	props: {},
	data() {
		return {
			t: this.$root.t,
			model: _.cloneDeep(formModel),
			state: {
				process: false,
				valid: false,
				formError: false,
				formMessage: '',
			},
			errors: {},
		}
	},
	mounted() {
		get('/api/get_member_profile').then((resp) => {
			this.model = resp.data;
		});
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
			if (model.password && (model.password === '' || model.password.length < 3)) {
				valid = false;
				errors['password'] = this.t('message.input.required');
			}
			if (model.name_first && (model.name_first === '' || model.name_first.length < 3)) {
				valid = false;
				errors['name_first'] = this.t('message.input.required');
			}
			if (model.name_last && (model.name_last === '' || model.name_last.length < 3)) {
				valid = false;
				errors['name_last'] = this.t('message.input.required');
			}

			this.errors = errors;
			this.state.valid = valid;
		},
		submitHandler: function (e) {
			e.preventDefault();
			const self = this;
			this.state.process = true;
			this.state.formError = false;
			this.state.formMessage = '';
			const master = _.cloneDeep(this.model);

			return post('/api/update_member_profile', master).then((resp) => {
				if (resp.data.rows === 1) {
					self.state.formMessage = self.t(`message:update_success`);
				} else {
					self.state.formMessage = self.t(`message:update_error`);
					self.state.formError = true;
				}

				self.state.process = false;
			});
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