<template>
	<div
		class="Comments"
	>
		<new-comment-form
			:assigned="assigned"
			:assigned-id="assignedId"
			:onFormSubmit="formSubmitHandler"
		/>
		<comments-list
			:assigned="assigned"
			:assigned-id="assignedId"
			:items="comments"
		/>
	</div>
</template>

<script>
// import _ from 'lodash';
import { get, post } from '../../utils/http';
import NewCommentForm from './NewCommentForm';
import CommentsList from './CommentsList';

const loadComments = function (assigned, id) {
	return get(`/api/get_comments?assigned=${assigned}&assigned_id=${id}&with_children=true`);
}

// TODO: update all .vue imports & exports
export default {
	components: {
		'new-comment-form': NewCommentForm,
		'comments-list': CommentsList,
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
	},
	mounted() {
		if (this.assigned && this.assignedId) {
			loadComments(this.assigned, this.assignedId).then((resp) => {
				this.comments = resp.data;
			});
		}
	},
	data() {
		return {
			t: this.$root.t,
			comments: [],
		}
	},
	methods: {

		formSubmitHandler: function (model) {
			return new Promise((resolve) => {
				// ... as form callback
				console.log('model submit', model);
				// ... load comments as callback

				// return true;
				resolve(model);
			});
		},

	},
};
</script>

<style scoped>

</style>