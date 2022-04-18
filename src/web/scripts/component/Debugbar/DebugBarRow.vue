<template>
	<div
		class="DebugbarRow"
	>
		<h6
			@click="toggle"
			:class="open ? 'is-open' : ''"
		>
			{{title}}
		</h6>
		<div
			v-if="open"
			class="DebugbarRow-container"
		>
			<div
				class="DebugbarRow-content"
			>
				<pre>
					<code>
						<slot />
					</code>
				</pre>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: null,
		},
	},
	data() {
		return {
			t: this.$root.t,
			open: false,
		}
	},
	mounted() {},
	methods: {
		toggle: function (e) {
			this.open = !this.open;
		},
	},
};
</script>
