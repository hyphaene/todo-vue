export const ALL = "ALL";
export const COMPLETED = "COMPLETED";
export const TO_BE_COMPLETED = "TO_BE_COMPLETED";

export const applyFilterMapper = {
	[ALL]: todos => todos,
	[COMPLETED]: todos => todos.filter(todo => todo.completed),
	[TO_BE_COMPLETED]: todos => todos.filter(todo => !todo.completed)
};
