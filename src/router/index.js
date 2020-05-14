import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home
	},
	{
		path: "/todos",
		name: "Todos",
		component: () =>
			import(
				/* webpackChunkName: "todolist" */ "../views/todos/list/TodoList.vue"
			)
	},
	{
		path: "/todos/:id",
		name: "EditTodo",
		component: () =>
			import(
				/* webpackChunkName: "edittodo" */ "../views/todos/edit/EditTodo.vue"
			)
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

export default router;
