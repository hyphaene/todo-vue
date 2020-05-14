<template>
	<div>
		<li @click="click(todo.id)">{{ todo.title }}</li>
		<label for="todo">
			completed
			<input
				type="checkbox"
				:checked="todo.completed"
				name="todo"
				id="todo"
				@change="toggleCompleted(todo)"
			/>
		</label>
		<button @click="remove(todo)">Supprimer</button>
	</div>
</template>

<script>
export default {
	name: "TodoItem",
	props: {
		todo: {
			id: String,
			title: String
		},
		remove: Function,
		click: Function,
		toggleCompleted: Function
	}
};
</script>

<style scoped lang="scss">
li {
	margin: 0 10px;
}
</style>
