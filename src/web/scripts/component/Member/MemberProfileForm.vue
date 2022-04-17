<template>
	<form
		:id="formId"
		:name="formId"
	>
		<div class="mb-3">
			<ui-input
				:id="formId + '_name_first'"
				:label="t('form:label.name_first')"
				:placeholder="t('form:placeholder.name_first')"
				v-model="model.name_first"
				:error="errors.name_first"
			/>
		</div>
		<div class="mb-3">
			<ui-input
				:id="formId + '_name_last'"
				:label="t('form:label.name_last')"
				:placeholder="t('form:placeholder.name_last')"
				v-model="model.name_last"
				:error="errors.name_last"
			/>
		</div>
		<div class="mb-3">
			<ui-input
				type="email"
				:id="formId + '_email'"
				:label="t('form:label.email')"
				:placeholder="t('form:placeholder.email')"
				v-model="model.email"
				:error="errors.email"
				:disabled="true"
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
		<div class="mb-3">
			<ui-checkbox
				:id="formId + '_subscription'"
				:label="t('form:label.subscription')"
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
import _ from 'lodash';

import { EMAIL_REGEX } from '../../constants';
import { get, post } from '../../utils/http';
import { UiInput, UiCheckbox } from '../ui';

const formModel = {
	name_first: '',
	name_last: '',
	email: '',
	password: '',
	subscription: true,
};

export default {
	components: {
		'ui-input': UiInput,
		'ui-checkbox': UiCheckbox,
	},
	props: {
		formId: {
			type: String,
			default: 'MemberProfileForm',
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
					errors['email'] = this.t('message:input.email_format');
				} else {
					errors['email'] = this.t('message:input.required');
				}
			}
			if (model.password && (model.password === '' || model.password.length < 3)) {
				valid = false;
				errors['password'] = this.t('message:input.required');
			}
			if (model.name_first && (model.name_first === '' || model.name_first.length < 3)) {
				valid = false;
				errors['name_first'] = this.t('message:input.required');
			}
			if (model.name_last && (model.name_last === '' || model.name_last.length < 3)) {
				valid = false;
				errors['name_last'] = this.t('message:input.required');
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