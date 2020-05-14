import { TMP_ID, TOAST_DEFAULTS } from "../../constants";

export default function goToTodo(todoId) {
	if (todoId !== TMP_ID) {
		this.$router.push(`/todos/${todoId}`);
	} else {
		this.$toasted.show(`Attention, todo en cours de création !`, {
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
