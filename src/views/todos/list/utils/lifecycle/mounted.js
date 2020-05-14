import setRequestSettings from "../setRequestSettings";

export default async function() {
	const res = await fetch(
		"http://localhost:3000/todos",
		setRequestSettings("GET")
	);
	const data = await res.json();
	this.todos = data;
	this.todoLength = data.length;
	if (data.length === 0) {
		this.listIsEmpty = true;
		this.hasBeenFetched = true;
	}
}
