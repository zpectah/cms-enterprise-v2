<template>
	<div>
		<new-comment-form
			:assigned="assigned"
			:assigned-id="assignedId"
		/>
		<div>
			Comments list ... {{assigned}} ... {{assignedId}}
		</div>
	</div>
</template>

<script>
import _ from 'lodash';
import { get, post } from '../utils/http';
import { EMAIL_REGEX } from '../constants';
import NewCommentForm from './NewCommentForm';
import { UiInput, UiTextarea } from './ui';

const loadComments = function (assigned, id) {
	return get(`/api/get_comments?assigned=${assigned}&assigned_id=${id}&with_children=true`);
}

// TODO: update all .vue imports & exports
export default {
	components: {
		'new-comment-form': NewCommentForm,
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