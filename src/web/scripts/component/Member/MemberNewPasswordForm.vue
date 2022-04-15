<template>
	<form
		name="MemberNewPasswordForm"
	>
		<div class="mb-3">
			<ui-input
				type="password"
				id="MemberNewPasswordForm_password"
				label="New password"
				placeholder="New password"
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
				:disabled="!state.valid || state.process"
			>
				{{t('common:btn.submit')}}
			</button>
		</div>
	</form>
</template>

<script>
const _ = require('lodash');
const { get, post } = require('../../utils/http');
const { UiInput } = require('../ui');

const formModel = {
	password: '',
	token: '',
};

module.exports = {
	components: {
		'ui-input': UiInput,
	},
	props: {
		token: {
			type: [String, null],
			default: null,
		},
	},
	mounted() {
		this.model.token = this.token;
	},
	data() {
		return {
			t: this.$root.t,
			model: _.cloneDeep(formModel),
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

			if (model.password === '' || model.password.length < 3) {
				valid = false;
				errors['password'] = this.t('message.input.required');
			}

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

			return post('/api/member_create_new_password', master).then((resp) => {

				switch (resp.message) {

					case 'member_password_reset_success':
						break;

					case 'member_password_reset_error':
					case 'member_password_already_reset':
					case 'request_not_found':
					case 'token_not_found':
					default:
						self.state.formError = true;
						break;

				}

				self.state.formMessage = self.t(`message:${resp.message}`);
				self.state.process = false;
				self.model = _.cloneDeep(formModel);
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