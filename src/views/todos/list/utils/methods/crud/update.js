import setRequestSettings from "../../setRequestSettings";

export default async function update(todo) {
	// apply optimistic response
	todo.completed = !todo.completed;
	console.log({ todo: JSON.stringify(todo) });
	try {
		const res = await fetch(
			`http://localhost:3000/todos/${todo._id}`,
			setRequestSettings("PATCH", todo)
		);
		console.log(await res.json());
	} catch (error) {
		console.log(error);
		// correct optimistic response if error
		todo.completed = !todo.completed;
	}
}
