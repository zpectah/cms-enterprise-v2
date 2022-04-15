<template>
	<div class="form-check">
		<input
			type="checkbox"
			class="form-check-input"
			:id="id"
			:checked="checked"
			@input="(event) => $emit('update:checked',event.target.checked)"
		/>
		<label
			class="form-check-label"
			:for="id"
		>
			{{label}}
		</label>
	</div>
</template>

<script>
module.exports = {
	props: {
		id: {
			type: String,
			default: ''
		},
		checked: {
			type: Boolean,
			default: false,
		},
		label: {
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
	},
	// methods: {
	// 	onInput(e) {
	// 		this.$emit('update:modelChecked', e.target.checked);
	// 	}
	// },
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