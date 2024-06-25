//#region pepsData

export const pepsData_defaultColumns = ['id', 'Name', 'Dept', 'Batch', 'Phone'];
export const pepsData_pepInfos = [
	['1', 'Turjo', 'URP', '18', '01758524262'],
	['2', 'Slot', 'CSE', '19', '01758524262'],
	['3', 'Engine', 'ME', '20', '01758524262']
];
export const pepsData_defaultAliases = [
	{ value: '1', label: "Turjo URP'18" },
	{ value: '2', label: "Slot CSE'19" },
	{ value: '3', label: "Engine ME'20" }
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
	{ value: '1', label: "AAA URP'15" },
	{ value: '2', label: "BBB URP'16" },
	{ value: '3', label: "CCC CSE'17" },
	{ value: '4', label: "DDD CSE'15" },
	{ value: '5', label: "EEE CSE'16" },
	{ value: '6', label: "FFF URP'17" },
	{ value: '7', label: "GGG LE'15" },
	{ value: '8', label: "HHH LE'16" },
	{ value: '9', label: "III LE'17" },
	{ value: '10', label: "JJJ URP'20" }
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
export const slotsData_defaultColumns_types = [
	'string',
	'string',
	'singleSelect',
	'string',
	'string',
	'multiSelect',
	'multiSelect'
];
export type SlotInfosRow = [string, string, string[], string, string, number[], number[]][];

export const slotsData_newRow: SlotInfosRow = [['1', '---', [], '3', '---', [], []]];

export const slotsData_default_SlotInfos: SlotInfosRow = [
	['1', 'Amar Shonar Bangla', ['Song'], '3', '5', [], []],
	['2', 'Purbo digonte shurjo utheche', ['Dance'], '5', '3', [], []],
	['3', 'Kajla Didi', ['Poem'], '3', '3', [], []],
	['4', 'GTA 5 Real-life', ['Slide'], '5', '7', [], []]
];

export const slotsData_test_SlotInfos: SlotInfosRow = [
	['1', 'Amar Shonar Bangla', ['Song'], '', '5', [], []],
	['2', 'Purbo digonte shurjo utheche', ['Dance'], '5', '3', [], []],
	['3', 'Kajla Didi', ['Poem'], '3', '3', [], []],
	['4', 'GTA 5 Real-life', ['Slide'], '5', '7', [], []],
	['5', 'GTA 5 Real-life', ['Slide'], '5', '7', [], []],
	['6', 'GTA 5 Real-life', ['Slide'], '5', '7', [], []],
	['7', 'GTA 5 Real-life', ['Slide'], '5', '7', [], []],
	['8', 'GTA 5 Real-life', ['Slide'], '5', '7', [], []],
	['9', 'GTA 5 Real-life', ['Slide'], '5', '7', [], []],
	['10', 'GTA 5 Real-life', ['Slide'], '5', '7', [], []]
];

//#endregion

//#region TABLE Library DATA
// People Data
export const pepsData_table_pepInfos = [
	['id', 'Name', 'Dept', 'Batch', 'Phone'],
	['1', 'Turjo', 'URP', '18', '01758524262'],
	['2', 'Slot', 'CSE', '19', '01758524262'],
	['3', 'Engine', 'ME', '20', '01758524262']
];

export const pepsData_table_defaultAliases = [
	['id', 'Alias'],
	['1', "Turjo URP'18"],
	['2', "Slot CSE'19"],
	['3', "Engine ME'20"]
];

// Test Data
export const pepsData_table_test_PepInfos = [
	['id', 'Name', 'Dept', 'Batch', 'Phone'],
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
//#endregion

//#region Instruments List, Slot types
export const Performance_types = [
	'Dance',
	'Song',
	'Drama',
	'Poem',
	'Instrumental',
	'Slide',
	'Speech',
	'Magic'
];

export const Instruments_list = [
	'Accordion',
	'Acoustic guitar',
	'Banjo',
	'Bass guitar',
	'Bongo',
	'Box drum',
	'Cello',
	'Chimta',
	'Clarinet',
	'Cymbal',
	'Dhime',
	'Double bass',
	'Drum kit',
	'Ektara',
	'Electric bass guitar',
	'Electric guitar',
	'Erhu',
	'Esraj',
	'Euphonium',
	'Fiddle',
	'Flute',
	'French horn',
	'Ghatam',
	'Glockenspiel',
	'Gong',
	'Guitar',
	'Guqin',
	'Guzheng',
	'Hammered dulcimer',
	'Hang',
	'Harmonica',
	'Harmonium',
	'Harp',
	'Harpsichord',
	'Hulusi',
	'Hurdy gurdy',
	'Kalimba',
	'Kantele',
	'Keyboard',
	'Koto',
	'Lute',
	'Lyre',
	'Mandola',
	'Mandolin',
	'Marimba',
	'Melodica',
	'Octobass',
	'Organ',
	'Otamatone',
	'Oud',
	'Pan Pipes',
	'Panduri',
	'Pennywhistle',
	'Piano',
	'Pianola',
	'Piccolo',
	'Pipa',
	'Pungi',
	'Rebab',
	'Rebec',
	'Recorder',
	'Santoor',
	'Sarangi',
	'Sarinda',
	'Sarod',
	'Saxophone',
	'Shehnai',
	'Sheng',
	'Sitar',
	'Steelpan',
	'Stylophone',
	'Suona',
	'Suroz',
	'Sursingar',
	'Synth',
	'Tabla',
	'Tambourine',
	'Timpani',
	'Triangle',
	'Trombone',
	'Trumpet',
	'Ukulele',
	'Veena',
	'Venova',
	'Vibraphone',
	'Viola',
	'Violin',
	'Whamola',
	'Xaphoon',
	'Xylophone',
	'Yotar',
	'Zither'
];
//#endregion
