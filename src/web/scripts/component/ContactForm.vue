<template>
	<form
		name="ContactForm"
	>
		<div class="mb-3">
			<ui-input
				type="email"
				id="ContactForm_sender"
				label="sender"
				placeholder="sender"
				v-model="model.sender"
				:error="errors.sender"
				:disabled="!!email"
			/>
		</div>
		<div class="mb-3">
			<ui-input
				id="ContactForm_subject"
				label="subject"
				placeholder="subject"
				v-model="model.subject"
				:error="errors.subject"
			/>
		</div>
		<div class="mb-3">
			<ui-textarea
				id="ContactForm_content"
				label="content"
				placeholder="content"
				v-model="model.content"
				:error="errors.content"
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
	</form>
</template>

<script>
const _ = require('lodash');
const { EMAIL_REGEX } = require('../constants');
const { post } = require('../utils/http');
const { UiInput, UiTextarea } = require('./ui');

const formModel = {
	sender: '',
	subject: '',
	content: '',
	type: 'contact_form',
};

module.exports = {
	components: {
		'ui-input': UiInput,
		'ui-textarea': UiTextarea,
	},
	props: {
		email: {
			type: String,
			default: '',
		},
	},
	mounted() {
		if (this.email) this.model.sender = this.email;
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

			if (model.sender === '' || model.sender.length < 3) {
				valid = false;
				errors['sender'] = this.t('message.input.required');
			}
			if (model.subject === '' || model.subject.length < 3) {
				valid = false;
				errors['subject'] = this.t('message.input.required');
			}
			if (model.content === '' || model.content.length < 3) {
				valid = false;
				errors['content'] = this.t('message.input.required');
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
			const target = window.location.href;

			return post('/api/create_messages', master).then((resp) => {
				switch (resp.message) {

					case 'member_login_success':
						setTimeout(() => {
							window.location.href = target;
						}, 2500);
						break;

					case 'member_not_found':
					case 'member_password_mismatch':
					case 'member_not_active':
					case 'member_is_deleted':
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