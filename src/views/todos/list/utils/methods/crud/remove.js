import enableErrorSimulation from "../../enableErrorSimulation";
import setRequestSettings from "../../setRequestSettings";
import { TOAST_DEFAULTS } from "../../../constants";

export default async function remove(item) {
	this.lastItem = item;
	this.lastItemIndex = this.todos.findIndex(el => el === item);
	// optimistic response
	this.todos.splice(this.lastItemIndex, 1);
	try {
		const res = await fetch(
			`http://localhost:3000/todos/${item._id}`,
			setRequestSettings("DELETE")
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
			...TOAST_DEFAULTS,
			action: {
				text: "OK",
				onClick: (e, toastObject) => {
					toastObject.goAway(0);
				}
			}
		});
	}
}
