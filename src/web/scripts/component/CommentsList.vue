<template>
	<div>
		Comments list ... {{model}} ... {{modelId}}
	</div>
</template>

<script>

function loadComments () {

	console.log('load comments list ...');

	return [];
}

module.exports = {
	props: {
		model: {
			type: String,
			default: null,
		},
		modelId: {
			type: String,
			default: null,
		},
	},
	mounted() {
		if (this.model && this.modelId) {
			loadComments().then((resp) => {
				console.log('list ...', resp);
			});
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