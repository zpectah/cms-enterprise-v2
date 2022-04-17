<template>
	<div>demo component: {{globalValue}} ... {{count}} ... {{t('common:btn.close')}}</div>
</template>

<script>
export default {
	props: {},
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