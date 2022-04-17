<template>
	<div class="hstack gap-2">
		<button
			type="button"
			class="btn btn-success btn-sm"
			@click="addLike"
			:disabled="state.voted"
		>
			{{t('common:btn.like')}} ({{state.likes}})
		</button>
		<button
			type="button"
			class="btn btn-warning btn-sm"
			@click="addDislike"
			:disabled="state.voted"
		>
			{{t('common:btn.dislike')}} ({{state.dislikes}})
		</button>
	</div>
</template>

<script>
import { post } from '../utils/http';
import { isVoted, setVoted } from '../utils/rating';

const updateField = (model, type, id) => {
	let pathSuffix;
	if (model === 'posts') {
		switch (type) {

			case 'like':
				pathSuffix = 'like_posts';
				break;

			case 'dislike':
				pathSuffix = 'dislike_posts';
				break;

		}
	}
	if (pathSuffix && id) {
		return post(`/api/${pathSuffix}`, [ id ]);
	}
};

export default {
	props: {
		modelType: {
			type: String,
			default: null,
		},
		modelId: {
			type: Number,
			default: null,
		},
		likes: {
			type: Number,
			default: 0,
		},
		dislikes: {
			type: Number,
			default: 0,
		},
	},
	mounted() {
		if (this.likes) this.state.likes = this.likes;
		if (this.dislikes) this.state.dislikes = this.dislikes;
		this.state.voted = isVoted(this.modelType, this.modelId);
	},
	data() {
		return {
			t: this.$root.t,
			state: {
				likes: 0,
				dislikes: 0,
				voted: false,
			},
		}
	},
	methods: {
		addLike: function (e) {
			e.preventDefault();
			const self = this;
			return updateField(this.modelType, 'like', this.modelId).then((resp) => {
				if (resp.data) {
					self.state.likes += 1;
					self.state.voted = true;
					setVoted(self.modelType, self.modelId);
				}
			});
		},
		addDislike: function (e) {
			e.preventDefault();
			const self = this;
			return updateField(this.modelType, 'dislike', this.modelId).then((resp) => {
				if (resp.data) {
					self.state.dislikes += 1;
					self.state.voted = true;
					setVoted(self.modelType, self.modelId);
				}
			});
		},
	},
};
</script>

<style scoped>

</style>