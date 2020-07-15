<template>
	<div class="hello" id="nav">
		<!-- <Filter :filter="filter" :setFilter="setFilter" /> -->
		<li>
			<router-link to="/">Go back to home</router-link>
		</li>
		<ul>
			<TodoItem
				v-for="todo in filteredTodos"
				:key="todo.id"
				:todo="todo"
				:remove="remove"
				:click="goTo"
				:toggleCompleted="toggleCompleted"
			/>
		</ul>
		<AddTodo :submit="add" />
	</div>
</template>

<script>
import TodoItem from "./components/TodoItem";
import AddTodo from "./components/AddTodo";
// import Filter from "./components/Filter/Filter";

import remove from "./utils/methods/crud/remove";
import add from "./utils/methods/crud/add";
import update from "./utils/methods/crud/update";
import goToTodo from "./utils/methods/goToTodo";
import mounted from "./utils/lifecycle/mounted";
import watchListIsEmpty from "./utils/watch/listIsEmpty";
import watchTodoLength from "./utils/watch/todoLength";
import applyFilter from "./utils/applyFilter";

export default {
	name: "TodoList",
	props: {
		msg: String
	},
	components: { TodoItem, AddTodo },
	data: function() {
		return {
			todos: [],
			todoLength: 0,
			lastItem: "",
			lastItemIndex: 0,
			hasBeenFetched: false,
			listIsEmpty: false,
			filter: "ALL"
		};
	},
	computed: {
		filteredTodos: function() {
			return applyFilter(this.filter, this.todos);
		}
	},
	mounted: function() {
		mounted.bind(this)();
	},
	methods: {
		add: function(todo) {
			add.bind(this)(todo);
		},

		remove: function(todo) {
			remove.bind(this)(todo);
		},
		toggleCompleted: function(todo) {
			update.bind(this)(todo);
		},
		goTo: function(todoId) {
			goToTodo.bind(this)(todoId);
		},
		setFilter: function(value) {
			this.filter = value;
		}
	},
	watch: {
		listIsEmpty: function() {
			watchListIsEmpty.bind(this)();
		},
		todoLength: function() {
			watchTodoLength.bind(this)();
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
ul {
	list-style-type: none;
	padding: 0;
}

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
