import { TOAST_DEFAULTS } from "../../constants";

export default function watchListIsEmpty() {
	this.$toasted.show(`Il n'y a rien dans la liste :(`, {
		...TOAST_DEFAULTS,
		action: {
			text: "OK",
			onClick: (e, toastObject) => {
				toastObject.goAway(0);
			}
		}
	});
}
