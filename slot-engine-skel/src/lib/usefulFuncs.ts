export function findDuplicateFromList(data: Array<string>) {
	const idCount = new Map();
	const duplicateIds = [];

	for (const entry of data) {
		if (idCount.has(entry)) {
			idCount.set(entry, idCount.get(entry) + 1);
			if (idCount.get(entry) === 2) {
				duplicateIds.push(entry);
			}
		} else {
			idCount.set(entry, 1);
		}
	}

	return duplicateIds;
}
