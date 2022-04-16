<template>
	<div
		class="Comments-list-item"
	>
		<div
			class="Comments-list-item-heading"
		>
			<p
				style="margin: 0;padding: 0;"
			>
				{{item.email}} | {{item.created}}
			</p>
			<h5
				class="title title--item"
				style="margin: 0;padding: 0 0 1rem 0;"
			>
				{{item.title}}
			</h5>
		</div>
		<div
			class="Comments-list-item-content"
		>
			{{item.content}}
		</div>
		<div
			class="Comments-list-item-footer"
			v-if="anonymous"
		>
			<button
				class="btn btn-secondary btn-sm"
				@click="openFormHandler"
				v-if="!reply"
			>
				{{t('common:btn.reply')}}
			</button>
			<button
				class="btn btn-outline-secondary btn-sm"
				@click="closeFormHandler"
				v-if="reply"
			>
				{{t('common:btn.cancel')}}
			</button>
		</div>
		<div
			class="Comments-list-item-reply"
			v-if="reply && anonymous"
		>
			<new-comment-form
				:assigned="assigned"
				:assigned-id="assignedId"
				:parent="item.id"
				:onFormSubmit="formSubmitHandler"
				:email="email"
			/>
		</div>
		<div
			class="Comments-list-item-children"
		>
			<comment-item
				v-for="sub in item.children"
				:item="sub"
				:assigned="assigned"
				:assigned-id="assignedId"
				:onFormSubmit="formSubmitHandler"
				:parent="item.id"
				:email="email"
				:anonymous="anonymous"
			/>
		</div>
	</div>
</template>

<script>
import NewCommentForm from './NewCommentForm';

export default {
	components: {
		'new-comment-form': NewCommentForm,
	},
	props: {
		item: {
			type: Object,
			default: null,
		},
		assigned: {
			type: String,
			default: null,
		},
		assignedId: {
			type: String,
			default: null,
		},
		parent: {
			type: [String, Number],
			default: null,
		},
		onFormSubmit: {
			type: Function,
			default: null,
		},
		email: {
			type: String,
			default: null,
		},
		anonymous: null,
	},
	data() {
		return {
			t: this.$root.t,
			reply: false,
		}
	},
	methods: {
		openFormHandler: function (e) {
			e.preventDefault();
			this.reply = true;
		},
		closeFormHandler: function (e) {
			e.preventDefault();
			this.reply = false;
		},
		formSubmitHandler: function (model) {
			return this.onFormSubmit(model).then(() => {
				this.reply = false;
			})
		}
	},
};
</script>

<style scoped>

</style>