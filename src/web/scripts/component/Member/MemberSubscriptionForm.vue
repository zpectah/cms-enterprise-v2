<template>
	<form
		name="MemberSubscriptionForm"
	>
		<div class="mb-3">
			<ui-input
				id="MemberSubscriptionForm_email"
				label="Your e-mail"
				placeholder="Your e-mail"
				v-model="model.email"
				:error="state.errors.email"
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
const { UiInput } = require('../ui');

const formModel = {
	email: '',
};

module.exports = {
	components: {
		'ui-input': UiInput,
	},
	props: {},
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
			this.state.errors = {};

			if (model.email === '' || model.email.length < 3 || !model.email.match(EMAIL_REGEX)) {
				valid = false;
				if (!model.email.match(EMAIL_REGEX)) {
					this.state.errors['email'] = this.t('message.input.email_format');
				} else {
					this.state.errors['email'] = this.t('message.input.required');
				}
			}

			this.state.valid = valid;
		},
		submitHandler: function (e) {
			e.preventDefault();
			const self = this;
			this.state.process = true;
			this.state.formError = false;
			this.state.formMessage = '';
			const master = _.cloneDeep(this.model);

			return post('/api/member_subscribe', master).then((resp) => {
				switch (resp.message) {

					case 'member_success_created':
						break;

					case 'member_is_blacklisted':
					case 'user_not_created':
					case 'member_already_exist':
					case 'member_subscribe_error':
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