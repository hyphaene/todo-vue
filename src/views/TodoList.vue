<template>
	<div class="hello" id="nav">
		<li>
			<router-link to="/">Go back to home</router-link>
		</li>
		<ul>
			<TodoItem
				v-for="todo in todos"
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
const setRequest = (method, todo = null) => ({
	method,
	headers: {
		Accept: "application/json, text/plain, */*",
		"Content-Type": "application/json"
	},
	...(todo ? { body: JSON.stringify({ todo }) } : {})
});

import TodoItem from "@/components/todos/TodoItem";
import AddTodo from "@/components/todos/AddTodo";

const ALL = "ALL";
const COMPLETED = "COMPLETED";
const TO_BE_COMPLETED = "TO_BE_COMPLETED";

const applyFilterMapper = {
	[ALL]: todos => todos,
	[COMPLETED]: todos => todos.filter(todo => todo.completed),
	[TO_BE_COMPLETED]: todos => todos.filter(todo => !todo.completed)
};

const applyFilter = (filter, todos) => applyFilterMapper[filter](todos);

console.log({ applyFilter });

const enableErrorSimulation = (rate = 0.4) => {
	const errorSimulation = Math.random() < rate;

	if (errorSimulation) {
		throw Error("error");
	}
};

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
	mounted: async function() {
		const res = await fetch("http://localhost:3000/todos", setRequest("GET"));
		const data = await res.json();
		this.todos = data;
		this.todoLength = data.length;
		if (data.length === 0) {
			this.listIsEmpty = true;
		}
	},
	methods: {
		add: async function(todo) {
			todo.completed = false;
			// optimistic response
			this.todos.push({ ...todo, id: "tempID" });

			try {
				const res = await fetch(
					`http://localhost:3000/todos`,
					setRequest("POST", todo)
				);
				const data = await res.json();
				enableErrorSimulation();

				console.log({ data });
				// replace with real todo
				this.todos.splice(this.todos.length - 1, 1, data);
				this.todoLength += 1;
			} catch (error) {
				// correct optimistic response
				this.todos.pop();
				console.log(error);
				this.$toasted.show(`Hum, une erreur s'est produite :/ ( simulation )`, {
					theme: "toasted-primary",
					position: "top-right",
					duration: 5000,
					action: {
						text: "OK",
						onClick: (e, toastObject) => {
							toastObject.goAway(0);
						}
					}
				});
			}
		},
		remove: async function(item) {
			this.lastItem = item;
			this.lastItemIndex = this.todos.findIndex(el => el === item);
			// optimistic response
			this.todos.splice(this.lastItemIndex, 1);
			try {
				const res = await fetch(
					`http://localhost:3000/todos/${item.id}`,
					setRequest("DELETE")
				);

				const newTodo = await res.json();
				enableErrorSimulation();
				// trigger length diff in array
				this.todoLength -= 1;
				console.log(newTodo);
			} catch (error) {
				console.log(error);
				this.todos.splice(this.lastItemIndex, 0, this.lastItem);
				this.$toasted.show(`Hum, une erreur s'est produite :/`, {
					theme: "toasted-primary",
					position: "top-right",
					duration: 5000,
					action: {
						text: "OK",
						onClick: (e, toastObject) => {
							toastObject.goAway(0);
						}
					}
				});
			}
		},
		goTo: function(id) {
			if (id !== "tempID") {
				this.$router.push(`/todos/${id}`);
			} else {
				this.$toasted.show(`Attention, todo en cours de création !`, {
					theme: "toasted-primary",
					position: "top-right",
					duration: 5000,
					action: {
						text: "OK",
						onClick: (e, toastObject) => {
							toastObject.goAway(0);
						}
					}
				});
			}
		},
		toggleCompleted: async function(todo) {
			// apply optimistic response
			todo.completed = !todo.completed;
			console.log({ todo: JSON.stringify(todo) });
			try {
				const res = await fetch(
					`http://localhost:3000/todos/${todo.id}`,
					setRequest("PATCH", todo)
				);
				console.log(await res.json());
			} catch (error) {
				console.log(error);
				// correct optimistic response if error
				todo.completed = !todo.completed;
			}
		}
	},
	watch: {
		listIsEmpty: function() {
			this.$toasted.show(`Il n'y a rien dans la liste :(`, {
				theme: "toasted-primary",
				position: "top-right",
				duration: 5000,
				action: {
					text: "OK",
					onClick: (e, toastObject) => {
						toastObject.goAway(0);
					}
				}
			});
		},
		todoLength: function(currentLength, previousLength) {
			if (!this.hasBeenFetched) {
				this.$toasted.show(`la liste a été fetchée`, {
					theme: "toasted-primary",
					position: "top-right",
					duration: 5000,
					action: {
						text: "OK",
						onClick: (e, toastObject) => {
							toastObject.goAway(0);
						}
					}
				});
				this.hasBeenFetched = true;
			} else {
				if (currentLength > previousLength) {
					this.$toasted.show(
						`${this.todos[previousLength].title} a été ajouté :)`,
						{
							theme: "toasted-primary",
							position: "top-right",
							duration: 5000,
							action: {
								text: "Annuler",
								onClick: (e, toastObject) => {
									this.todos.pop();
									toastObject.goAway(0);
								}
							}
						}
					);
				} else if (currentLength < previousLength) {
					this.$toasted.show(`${this.lastItem.title} a été supprimé !`, {
						theme: "toasted-primary",
						position: "top-right",
						duration: 5000,
						action: {
							text: "Annuler",
							onClick: (e, toastObject) => {
								this.todos.splice(this.lastItemIndex, 0, this.lastItem);
								toastObject.goAway(0);
							}
						}
					});
				} else {
					this.$toasted.success("updated !!", {
						theme: "toasted-primary",
						position: "top-right",
						duration: 5000
					});
				}
			}
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
