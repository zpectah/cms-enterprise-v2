<template>
	<div>
		new comment form ... {{assigned}} ... {{assignedId}}
	</div>
</template>

<script>
const _ = require('lodash');
const { EMAIL_REGEX } = require('../constants');
const { get, post } = require('../utils/http');
const { UiInput, UiTextarea } = require('./ui');

module.exports = {
	props: {
		assigned: {
			type: String,
			default: null,
		},
		assignedId: {
			type: String,
			default: null,
		},
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