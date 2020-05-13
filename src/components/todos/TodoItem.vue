<template>
	<!-- <Fragment> -->
	<div>
		<li>{{ todo }}</li>
		<button @click="remove(todo)">Supprimer</button>
	</div>
	<!-- </Fragment> -->
</template>

<script>
// import { Fragment } from 'vue-fragment';

export default {
	name: 'TodoItem',
	props: {
		todo: String,
		remove: Function,
	},
	// components: { Fragment },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
li {
	margin: 0 10px;
}
</style>
