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
		<div class="mb-3">
			<ui-input
				type="password"
				:id="formId + '_password'"
				:label="t('form:label.password')"
				:placeholder="t('form:placeholder.password')"
				v-model="model.password"
				:error="errors.password"
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

import { EMAIL_REGEX } from '../../constants';
import { post } from '../../utils/http';
import { UiInput } from '../ui';

const formModel = {
	email: '',
	password: '',
};

export default {
	components: {
		'ui-input': UiInput,
	},
	props: {
		formId: {
			type: String,
			default: 'MemberLoginForm',
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
					errors['email'] = this.t('message:input.email_format');
				} else {
					errors['email'] = this.t('message:input.required');
				}
			}
			if (model.password === '' || model.password.length < 3) {
				valid = false;
				errors['password'] = this.t('message:input.required');
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

			return post('/api/member_login', master).then((resp) => {
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