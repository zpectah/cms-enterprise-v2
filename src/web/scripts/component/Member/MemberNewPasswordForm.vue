<template>
	<form
		:id="formId"
		:name="formId"
	>
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

import { post } from '../../utils/http';
import { UiInput } from '../ui';

const formModel = {
	password: '',
	token: '',
};

export default {
	components: {
		'ui-input': UiInput,
	},
	props: {
		formId: {
			type: String,
			default: 'MemberNewPasswordForm',
		},
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