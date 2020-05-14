export default function setRequestSettings(method, todo = null) {
	return {
		method,
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json"
		},
		...(todo ? { body: JSON.stringify(todo) } : {})
	};
}
