<template>
	<div>
		<input type="text" v-model="todo" />
		<button type="button" @click="onSubmit(todo)">coucou</button>
	</div>
</template>

<script>
export default {
	name: "AddTodo",
	props: {
		submit: Function
	},
	data: function(see) {
		console.log({ see });
		return {
			todo: ""
		};
	},
	methods: {
		onSubmit: function(todo) {
			this.submit({ title: todo });
			this.todo = "";
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
