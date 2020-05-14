<template>
	<div class="home">
		<p>this is a super edit todo: {{ id }}</p>
	</div>
</template>

<script>
export default {
	name: 'EditTodo',
	data: function() {
		return {
			id: this.$route.params.id,
		};
	},
};
</script>

<style scoped lang="scss">
p {
	color: blue;
}
</style>
