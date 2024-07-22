export function clamp(value: number, min: number, max: number) {
	return value < min ? min : value > max ? max : value;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function removeFromList(toRemove: any, from_list: any[]) {
	return from_list.filter((thing) => {
		if (thing !== toRemove) {
			return thing;
		}
	});
}
