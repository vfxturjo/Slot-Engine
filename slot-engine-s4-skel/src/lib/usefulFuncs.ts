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

export function donwloadBlob(data: any, fileName: string) {
	const blob = new Blob([data]);
	if (navigator.msSaveBlob) {
		// IE 10+
		navigator.msSaveBlob(blob, exportedFilenmae);
	} else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
		const hiddenElement = window.document.createElement('a');
		hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(data);
		hiddenElement.target = '_blank';
		hiddenElement.download = fileName;
		hiddenElement.click();
	} else {
		const link = document.createElement('a');
		if (link.download !== undefined) {
			// Browsers that support HTML5 download attribute
			const url = URL.createObjectURL(blob);
			link.setAttribute('href', url);
			link.setAttribute('download', fileName);
			link.style.visibility = 'hidden';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	}
}

export function ConvertCSVToArrayOfDict(stringVal, splitter) {
	const [keys, ...rest] = stringVal
		.trim()
		.split('\n')
		.map((item) => item.split(splitter));

	const formedArr = rest.map((item) => {
		const object = {};
		keys.forEach((key, index) => (object[key] = item.at(index)));
		return object;
	});
	return formedArr;
}

export function ConvertCSVToArrayOfArrays(stringVal, splitter) {
	const [keys, ...rest] = stringVal
		.trim()
		.split('\n')
		.map((item) => item.split(splitter));

	const sequenceOfLenKeys = getSequenceArray(keys.length);

	const formedArr = rest.map((item) => {
		let row = [];

		sequenceOfLenKeys.forEach((value, index) => (row[index] = item[index]));

		return row;
	});
	return [keys, formedArr];
}

export function getSequenceArray(length: number) {
	const filledArray = [];
	for (let i = 0; i < length; i++) {
		filledArray.push(i + 1);
	}
	// console.log(filledArray);
	return filledArray;
}

export async function handleFileInputCSV(files: FileList) {
	return await files[0].text();
}
