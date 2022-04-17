<template>
	<div>
		<label
			v-if="label"
			class="form-label"
			:for="id"
		>
			{{label}}
		</label>
		<div
			class="input-group"
		>
			<input
				class="form-control"
				:class="error ?? 'is-invalid'"
				:type="type"
				:id="id"
				:placeholder="placeholder"
				:value="modelValue"
				@input='onInput'
				:disabled="readonly || disabled"
			/>
			<div
				v-if="help"
				class="form-text"
			>
				{{help}}
			</div>
			<div
				v-if="error"
				class="form-text invalid-feedback"
			>
				{{error}}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		id: {
			type: String,
			default: ''
		},
		modelValue: {
			type: [String, Number],
			default: ''
		},
		label: {
			type: String,
			default: ''
		},
		type: {
			type: String,
			default: 'text'
		},
		placeholder: {
			type: String,
			default: ''
		},
		help: {
			type: String,
			default: '',
		},
		error: {
			type: String,
			default: '',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		readonly: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		onInput(e) {
			this.$emit('update:modelValue', e.target.value);
		}
	},
	data() {
		return {
			count: 0,
			globalValue: this.$root.globalValue,
			t: this.$root.t,
		}
	}
};
</script>

<style scoped>

</style>