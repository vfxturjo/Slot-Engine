export function clamp(value: number, min: number, max: number) {
	return value < min ? min : value > max ? max : value;
}

export function clampToMinZero(value: number) {
	return value < 0 ? 0 : value;
}

export function mapRange(value: number, toMin = 0, toMax = 1, fromMin = 0, fromMax = 1) {
	return ((value - fromMin) / (fromMax - fromMin)) * (toMax - toMin) + toMin;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function removeFromList(toRemove: any, from_list: any[]) {
	return from_list.filter((thing) => {
		if (thing !== toRemove) {
			return thing;
		}
	});
}
