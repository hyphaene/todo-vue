<template>
	<div>
		<h1>{{ msg }}</h1>
		<li><router-link to="/">/</router-link></li>
		<li><router-link to="/foo">/foo</router-link></li>
		<li><router-link to="/bar">/bar</router-link></li>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'Menu',
	props: {
		msg: String,
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>
