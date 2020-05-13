import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import Toasted from 'vue-toasted';
import VueRouter from 'vue-router';
import TodoList from './components/TodoList';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Toasted);

// 1. Define route components.
// These can be imported from other files
const Foo = { template: '<div>foo</div>', name: 'Foo' };
const Bar = { template: '<div>bar</div>', name: 'Bar' };

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
	{ path: '/foo', component: Foo },
	{ path: '/bar', component: Bar },
	{ path: '/', component: TodoList },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
	routes, // short for `routes: routes`
});

new Vue({ router, render: (h) => h(App) }).$mount('#app');
