<template>
	<form
		:id="formId"
		:name="formId"
	>
		<div class="mb-3">
			<ui-input
				type="email"
				:id="formId + '_email'"
				:label="t('form:label.email')"
				:placeholder="t('form:placeholder.email')"
				v-model="model.email"
				:error="errors.email"
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
const { post } = require('../../utils/http');
const { UiInput } = require('../ui');

const formModel = {
	email: '',
};

module.exports = {
	components: {
		'ui-input': UiInput,
	},
	props: {
		formId: {
			type: String,
			default: 'MemberSubscriptionForm',
		},
	},
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