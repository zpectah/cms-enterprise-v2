<template>
	<div
		class="Comments-list"
	>
		<comment-item
			v-for="comment in items"
			:item="comment"
			:assigned="assigned"
			:assigned-id="assignedId"
			:onFormSubmit="formSubmitHandler"
			:email="email"
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
		onFormSubmit: {
			type: Function,
			default: null,
		},
		email: {
			type: String,
			default: null,
		},
	},
	data() {
		return {
			t: this.$root.t,
		}
	},
	methods: {
		formSubmitHandler: function (model) {
			return this.onFormSubmit(model);
		}
	},
};
</script>

<style scoped>

</style>