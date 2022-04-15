<template>
	<div>
		<label
			v-if="label"
			class="form-label"
			:for="id"
		>
			{{label}}
		</label>
		<input
			class="form-control"
			:type="type"
			:id="id"
			:placeholder="placeholder"
			:value="modelValue"
			@input='onInput'
		/>
	</div>
</template>

<script>
module.exports = {
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