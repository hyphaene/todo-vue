export default function enableErrorSimulation(rate = 0.4) {
	const errorSimulation = Math.random() < rate;

	if (errorSimulation) {
		throw Error("error");
	}
}
