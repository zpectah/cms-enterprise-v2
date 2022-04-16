<template>
	<div
		class="Comments-list"
	>
		<comment-item
			v-for="comment in items"
			:item="comment"
		/>
	</div>
</template>

<script>
import CommentItem from './CommentItem';

export default {
	components: {
		'comment-item': CommentItem,
	},
	props: {
		assigned: {
			type: String,
			default: null,
		},
		assignedId: {
			type: String,
			default: null,
		},
		items: {
			type: Array,
			default: [],
		},
	},
	data() {
		return {
			t: this.$root.t,
		}
	},
	methods: {},
};
</script>

<style scoped>

</style>