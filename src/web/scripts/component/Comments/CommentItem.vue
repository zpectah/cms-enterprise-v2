<template>
	<div
		class="Comments-list-item"
	>
		<div
			class="Comments-list-item-heading"
		>
			<h5
				class="title title--item"
			>
				{{item.title}}
			</h5>
		</div>
		<div
			class="Comments-list-item-content"
		>
			{{item.id}}
		</div>
		<div
			class="Comments-list-item-footer"
		>
			actions
		</div>
		<div
			class="Comments-list-item-children"
		>
			<comment-item
				v-for="sub in item.children"
				:item="sub"
			/>
		</div>
	</div>
</template>

<script>
module.exports = {
	props: {
		item: {
			type: Object,
			default: null,
		},
	},
	data() {
		return {
			t: this.$root.t,
		}
	}
};
</script>

<style scoped>

</style>