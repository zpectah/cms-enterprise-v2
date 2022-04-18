<template>
<div
	class="Debugbar"
>
	<button
		type="button"
		class="Debugbar-trigger"
		@click="showToggle"
	>
		<img
			src="/assets/cms-logo-sm.svg"
			alt="logo"
		/>
	</button>
	<div
		v-if="show"
		class="Debugbar-dialog"
	>
		<div
			class="Debugbar-dialog-container"
		>
			<div
				class="Debugbar-dialog-content"
			>
				<div
					class="Debugbar-dialog-inner"
				>
					<debug-bar-row
						title="_page"
					>
						<slot name="t-page" />
					</debug-bar-row>
					<debug-bar-row
						title="_category"
					>
						<slot name="t-category" />
					</debug-bar-row>
					<debug-bar-row
						title="_detail"
					>
						<slot name="t-detail" />
					</debug-bar-row>
					<debug-bar-row
						title="page"
					>
						<slot name="page" />
					</debug-bar-row>
					<debug-bar-row
						title="detail"
					>
						<slot name="detail" />
					</debug-bar-row>
					<debug-bar-row
						title="category-context"
					>
						<slot name="category-context" />
					</debug-bar-row>
					<debug-bar-row
						title="search-results"
					>
						<slot name="search-results" />
					</debug-bar-row>
					<debug-bar-row
						title="route"
					>
						<slot name="route" />
					</debug-bar-row>
					<debug-bar-row
						title="language"
					>
						<slot name="language" />
					</debug-bar-row>
					<debug-bar-row
						title="lang"
					>
						<slot name="lang" />
					</debug-bar-row>
					<debug-bar-row
						title="translations"
					>
						<slot name="translations" />
					</debug-bar-row>
					<debug-bar-row
						title="menu"
					>
						<slot name="menu" />
					</debug-bar-row>
					<debug-bar-row
						title="company"
					>
						<slot name="company" />
					</debug-bar-row>
					<debug-bar-row
						title="public"
					>
						<slot name="public" />
					</debug-bar-row>
					<debug-bar-row
						title="members-options"
					>
						<slot name="members-options" />
					</debug-bar-row>
					<debug-bar-row
						title="member"
					>
						<slot name="member" />
					</debug-bar-row>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import DebugBarRow from './DebugBarRow';

export default {
	components: {
		'debug-bar-row': DebugBarRow,
	},
	props: {},
	data() {
		return {
			t: this.$root.t,
			show: false,
		}
	},
	mounted() {
		console.log('mounted debugbar');
	},
	methods: {
		showToggle: function (e) {
			e.preventDefault();
			this.show = !this.show;
		},
	},
};
</script>
