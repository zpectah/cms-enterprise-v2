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
				:disabled="!!email"
			/>
		</div>
		<div class="mb-3">
			<ui-input
				:id="formId + '_title'"
				:label="t('form:label.title')"
				:placeholder="t('form:placeholder.title')"
				v-model="model.title"
				:error="errors.title"
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
import { UiInput, UiTextarea } from './../ui';

const formModel = {
	email: '',
	title: '',
	content: '',
	parent: 0,
	assigned: null,
	assigned_id: null,
	type: 'default',
};

export default {
	components: {
		'ui-input': UiInput,
		'ui-textarea': UiTextarea,
	},
	props: {
		formId: {
			type: String,
			default: 'NewCommentForm',
		},
		assigned: {
			type: String,
			default: null,
		},
		assignedId: {
			type: String,
			default: null,
		},
		parent: {
			type: [String, Number],
			default: 0,
		},
		onFormSubmit: {
			type: Function,
			default: null,
		},
		email: {
			type: String,
			default: null,
		},
	},
	mounted() {
		if (this.assigned) this.model.assigned = this.assigned;
		if (this.assignedId) this.model.assigned_id = Number(this.assignedId);
		if (this.parent) {
			this.model.parent = Number(this.parent);
			this.model.type = 'reply';
		}
		if (this.email) this.model.email = this.email;
	},
	data() {
		return {
			t: this.$root.t,
			model: _.cloneDeep(formModel),
			state: {
				process: false,
				valid: false,
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
			if (model.title === '' || model.title.length < 3) {
				valid = false;
				errors['title'] = this.t('message.input.required');
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
			const master = _.cloneDeep(this.model);

			return this.onFormSubmit(master).then((resp) => {
				self.state.process = false;
				self.model = _.cloneDeep({
					...formModel,
					assigned: this.assigned ? this.assigned : null,
					assigned_id: this.assignedId ? Number(this.assignedId) : null,
					parent: this.parent ? Number(this.parent) : null,
				});
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