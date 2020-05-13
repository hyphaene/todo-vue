<template>
	<div class="hello">
		<h1>{{ msg }}</h1>

		<ul>
			<TodoItem v-for="todo in todos" :key="todo" :todo="todo" :remove="remove" />
		</ul>
		<AddTodo :submit="submit" />
	</div>
</template>

<script>
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
const todos = ['jjijji', 'hello', 'coucou'];
export default {
	name: 'TodoList',
	props: {
		msg: String,
	},
	components: { TodoItem, AddTodo },
	data: function() {
		return {
			todos: todos,
			todoLength: todos.length,
			lastItem: '',
			lastItemIndex: 0,
		};
	},
	methods: {
		submit: function(item) {
			this.todoLength += 1;
			this.todos.push(item);
		},
		remove: function(item) {
			this.todoLength -= 1;
			const index = this.todos.findIndex((el) => el === item);
			this.lastItem = item;
			this.lastItemIndex = index;
			this.todos.splice(index, 1);
		},
	},
	watch: {
		todoLength: function(currentLength, previousLength) {
			console.log(this);
			if (currentLength > previousLength) {
				this.$toasted.show(`${this.todos[previousLength]} a été ajouté :)`, {
					theme: 'toasted-primary',
					position: 'top-right',
					duration: 5000,
					action: {
						text: 'Annuler',
						onClick: (e, toastObject) => {
							this.todos.pop();
							toastObject.goAway(0);
						},
					},
				});
			} else if (currentLength < previousLength) {
				this.$toasted.show(`${this.lastItem} a été supprimé !`, {
					theme: 'toasted-primary',
					position: 'top-right',
					duration: 5000,
					action: {
						text: 'Annuler',
						onClick: (e, toastObject) => {
							this.todos.splice(this.lastItemIndex, 0, this.lastItem);
							toastObject.goAway(0);
						},
					},
				});
			} else {
				this.$toasted.success('updated !!', {
					theme: 'toasted-primary',
					position: 'top-right',
					duration: 5000,
				});
			}
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
ul {
	list-style-type: none;
	padding: 0;
}
</style>
