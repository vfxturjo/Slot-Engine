//#region pepsData

export const pepsData_defaultColumns = ['id', 'Name', 'Dept', 'Batch', 'Phone'];
export const pepsData_pepInfos = [
	['1', 'Turjo', 'URP', '18', '01758524262'],
	['2', 'Slot', 'CSE', '19', '01758524262'],
	['3', 'Engine', 'ME', '20', '01758524262']
];
export const pepsData_defaultAliases = [
	['1', "Turjo URP'18"],
	['2', "Slot CSE'19"],
	['3', "Engine ME'20"]
];

// Test Data
export const pepsData_test_PepInfos = [
	['1', 'AAA', 'URP', '15', '888'],
	['2', 'BBB', 'URP', '16', '888'],
	['3', 'CCC', 'CSE', '17', '888'],
	['4', 'DDD', 'CSE', '15', '888'],
	['5', 'EEE', 'CSE', '16', '888'],
	['6', 'FFF', 'URP', '17', '888'],
	['7', 'GGG', 'LE', '15', '888'],
	['8', 'HHH', 'LE', '16', '888'],
	['9', 'III', 'LE', '17', '888'],
	['10', 'JJJ', 'URP', '20', '888']
];

export const pepsData_test_Aliases = [
	['1', "AAA URP'15"],
	['2', "BBB URP'16"],
	['3', "CCC CSE'17"],
	['4', "DDD CSE'15"],
	['5', "EEE CSE'16"],
	['6', "FFF URP'17"],
	['7', "GGG LE'15"],
	['8', "HHH LE'16"],
	['9', "III LE'17"],
	['10', "JJJ URP'20"]
];

//#endregion

//#region SlotData
export const slotsData_defaultColumns = [
	'id',
	'Name',
	'Type',
	'Hit',
	'Est Length',
	'Instruments',
	'Performers'
];

export type SlotInfosRow = [string, string, string, string, string, number[], number[]][];

export const slotsData_SlotInfos: SlotInfosRow = [
	['1', 'Amar Shonar Bangla', 'Song', '', '5', [], []],
	['2', 'Purbo digonte shurjo utheche', 'Dance', '5', '3', [], []],
	['3', 'Kajla Didi', 'Poem', '3', '3', [], []],
	['4', 'GTA 5 Real-life', 'Slide', '5', '7', [], []]
];
export const slotsData_test_SlotInfos: SlotInfosRow = [
	['1', 'Amar Shonar Bangla', 'Song', '', '5', [], []],
	['2', 'Purbo digonte shurjo utheche', 'Dance', '5', '3', [], []],
	['3', 'Kajla Didi', 'Poem', '3', '3', [], []],
	['4', 'GTA 5 Real-life', 'Slide', '5', '7', [], []],
	['5', 'GTA 5 Real-life', 'Slide', '5', '7', [], []],
	['6', 'GTA 5 Real-life', 'Slide', '5', '7', [], []],
	['7', 'GTA 5 Real-life', 'Slide', '5', '7', [], []],
	['8', 'GTA 5 Real-life', 'Slide', '5', '7', [], []],
	['9', 'GTA 5 Real-life', 'Slide', '5', '7', [], []],
	['10', 'GTA 5 Real-life', 'Slide', '5', '7', [], []]
];

//#endregion
