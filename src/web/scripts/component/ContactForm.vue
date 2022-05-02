<template>
	<form
		:id="formId"
		:name="formId"
	>
		<div class="mb-3">
			<ui-input
				type="email"
				:id="formId + '_sender'"
				:label="t('form:label.email')"
				:placeholder="t('form:placeholder.email')"
				v-model="model.sender"
				:error="errors.sender"
				:disabled="!!email"
			/>
		</div>
		<div class="mb-3">
			<ui-input
				:id="formId + '_subject'"
				:label="t('form:label.subject')"
				:placeholder="t('form:placeholder.subject')"
				v-model="model.subject"
				:error="errors.subject"
			/>
		</div>
		<div class="mb-3">
			<ui-textarea
				:id="formId + '_content'"
				:label="t('form:label.content')"
				:placeholder="t('form:placeholder.content')"
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
				class="ui-btn primary"
				@click="submitHandler"
				:disabled="!state.valid || state.process"
			>
				{{t('common:btn.submit')}}
			</button>
		</div>
	</form>
</template>

<script>
import _ from 'lodash';

import { EMAIL_REGEX } from '../constants';
import { post } from '../utils/http';
import { UiInput, UiTextarea } from './ui';

const formModel = {
	sender: '',
	subject: '',
	content: '',
	type: 'contact_form',
};

export default {
	components: {
		'ui-input': UiInput,
		'ui-textarea': UiTextarea,
	},
	props: {
		formId: {
			type: String,
			default: 'ContactForm',
		},
		email: {
			type: String,
			default: null,
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

			if (model.sender === '' || model.sender.length < 3 || !model.sender.match(EMAIL_REGEX)) {
				valid = false;
				if (!model.sender.match(EMAIL_REGEX)) {
					errors['sender'] = this.t('message:input.email_format');
				} else {
					errors['sender'] = this.t('message:input.required');
				}
			}
			if (model.subject === '' || model.subject.length < 3) {
				valid = false;
				errors['subject'] = this.t('message:input.required');
			}
			if (model.content === '' || model.content.length < 3) {
				valid = false;
				errors['content'] = this.t('message:input.required');
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

			return post('/api/create_messages', master).then((resp) => {
				if (resp.data && (resp.data.id && resp.data.id !== 0)) {
					self.state.formMessage = self.t(`message:message_sent`);
				} else if (resp.message) {
					self.state.formError = true;
					self.state.formMessage = self.t(`message:${resp.message}`);
				} else {
					self.state.formError = true;
					self.state.formMessage = self.t(`message:message_error`);
				}

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