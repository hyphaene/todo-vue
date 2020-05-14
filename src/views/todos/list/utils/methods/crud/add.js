import enableErrorSimulation from "../../enableErrorSimulation";
import setRequestSettings from "../../setRequestSettings";
import { TMP_ID, TOAST_DEFAULTS } from "../../../constants";

export default async function add(todo) {
	todo.completed = false;
	console.log({ this: this });
	// optimistic response
	this.todos.push({ ...todo, _id: TMP_ID });
	try {
		const res = await fetch(
			`http://localhost:3000/todos`,
			setRequestSettings("POST", todo)
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
