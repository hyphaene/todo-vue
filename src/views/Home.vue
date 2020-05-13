<template>
	<div class="home" id="nav">
		<li><router-link to="/todos">go to Todos</router-link></li>

		this is home
	</div>
</template>

<script>
export default {
	name: 'Home',
};
</script>

<style scoped lang="scss">
#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
