import { TOAST_DEFAULTS } from "../../constants";

export default function watchTodoLength(currentLength, previousLength) {
	if (!this.hasBeenFetched) {
		this.$toasted.show(`la liste a été fetchée`, {
			...TOAST_DEFAULTS,
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
					...TOAST_DEFAULTS,
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
				...TOAST_DEFAULTS,
				action: {
					text: "Annuler",
					onClick: (e, toastObject) => {
						this.todos.splice(this.lastItemIndex, 0, this.lastItem);
						toastObject.goAway(0);
					}
				}
			});
		}
	}
}
