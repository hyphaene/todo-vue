import { applyFilterMapper } from "../components/Filter/constants";

export default function applyFilter(filter, todos) {
	return applyFilterMapper[filter](todos);
}
