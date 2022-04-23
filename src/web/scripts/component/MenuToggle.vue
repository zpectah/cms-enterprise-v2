<template>
	<a
		@click="toggle"
		:class="className"
	>
		<i
			class="icon"
			:class="open ? 'bi-x-lg' : 'bi-list'"
		></i>
	</a>
</template>

<script>
export default {
	props: {
		className: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			t: this.$root.t,
			open: false,
			menu: null,
			root: null,
		}
	},
	mounted() {
		this.menu = document.getElementById('MainNavBar');
		this.root = document.querySelector('body');
	},
	methods: {
		toggle: function (e) {
			e.preventDefault();
			this.open = !this.open;
			this.menu.classList.toggle('collapsed', this.open);
			this.root.classList.toggle('fixed', this.open);
		},
	},
};
</script>

<style scoped>

</style>