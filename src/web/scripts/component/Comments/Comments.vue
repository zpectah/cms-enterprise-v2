<template>
	<div
		class="Comments"
	>
		<div
			v-if="!!anonymous && creatable"
		>
			<button
				class="btn btn-secondary"
				@click="openFormHandler"
				v-if="!comment"
			>
				{{t('common:btn.new-comment')}}
			</button>
			<button
				class="btn btn-outline-secondary"
				@click="closeFormHandler"
				v-if="comment"
			>
				{{t('common:btn.cancel')}}
			</button>
		</div>
		<new-comment-form
			v-if="comment && !!anonymous && creatable"
			:assigned="assigned"
			:assigned-id="assignedId"
			:onFormSubmit="formSubmitHandler"
			:email="email"
		/>
		<comments-list
			:assigned="assigned"
			:assigned-id="assignedId"
			:items="comments"
			:onFormSubmit="formSubmitHandler"
			:email="email"
			:anonymous="!!anonymous"
			:creatable="creatable"
		/>
	</div>
</template>

<script>
import { get, post } from '../../utils/http';
import NewCommentForm from './NewCommentForm';
import CommentsList from './CommentsList';

const loadComments = function (assigned, id) {
	return get(`/api/get_comments?assigned=${assigned}&assigned_id=${id}&with_children=true`);
}

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
		email: {
			type: String,
			default: null,
		},
		anonymous: null,
		creatable: null,
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
			comment: false,
			comments: [],
		}
	},
	methods: {
		openFormHandler: function (e) {
			e.preventDefault();
			this.comment = true;
		},
		closeFormHandler: function (e) {
			e.preventDefault();
			this.comment = false;
		},
		formSubmitHandler: function (master) {
			return new Promise((resolve) => {
				return post('/api/create_comments', master).then(() => {
					this.comment = false;
					loadComments(this.assigned, this.assignedId).then((r) => {
						this.comments = r.data;
					});

					return resolve(master);
				});
			});
		},
	},
};
</script>

<style scoped>

</style>