<template>
	<div>demo component: {{globalValue}} ... {{count}}</div>
</template>

<script>
module.exports = {
	props: {},
	data() {
		return {
			count: 0,
			globalValue: this.$root.globalValue,
		}
	}
};
</script>

<style scoped>

</style>