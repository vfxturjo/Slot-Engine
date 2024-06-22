<script lang="ts">
	import { get } from 'svelte/store';
	import { persisted } from 'svelte-persisted-store';
	import UsingTable from '../../lib/Components/using table.svelte';
	import convertArrayToCSV from 'convert-array-to-csv';
	import { donwloadBlob } from '$lib/usefulFuncs';
	import {
		ConvertCSVToArrayOfArrays,
		findDuplicateFromList,
		handleFileInputCSV
	} from '$lib/usefulFuncs';
	import {
		slotsData_defaultColumns,
		slotsData_SlotInfos,
		// testing
		slotsData_test_SlotInfos
	} from '../../lib/Defaults/defaultValues';

	let columns = persisted('slotsData-columns', slotsData_defaultColumns);
	let temp_data = persisted('slotsData-slotInfos_temp', slotsData_SlotInfos);
	let data = persisted('slotsData-slotInfos', slotsData_SlotInfos);

	$: conflicting_IDs = findDuplicateFromList(
		$temp_data.map((row) => {
			return row[0];
		})
	);

	$: highestID = Math.max(
		...$temp_data.map((row) => {
			return parseInt(row[0]);
		})
	);

	// IMPORT AND EXPORT DATA
	let files: FileList;
	$: if (files) {
		handleFileInputCSV(files).then((text) => {
			let [columns_imported, data_imported] = ConvertCSVToArrayOfArrays(text, ',');
			// $columns = columns_imported;
			$temp_data = data_imported;
		});
	}

	function exportData() {
		donwloadBlob(
			convertArrayToCSV($temp_data, {
				header: $columns,
				seperator: ','
			}),
			'people_data.csv'
		);
	}
</script>

<div class="py-8"></div>
<p class="h2 p-2 text-center">Edit Data here</p>

<div class="p-2">
	<div
		class="flex items-center justify-center p-2 w-full [&>*]:px-2 bg-black bg-opacity-10 rounded"
	>
		<p>CSV:</p>
		<input class="input w-60" accept=".csv" type="file" bind:files />
		<span> </span>
		<button class="btn variant-filled" on:click={exportData}> Export </button>
	</div>
	<UsingTable
		class="py-2"
		editable={true}
		newColumnData={[String(highestID + 1), ...$columns.slice(1)]}
		bind:columns={$columns}
		bind:data={$temp_data}
	/>
</div>

{#if conflicting_IDs.length != 0}
	<div class="bg-red-800 text-yellow-300">
		Conflicting Alias IDs: {conflicting_IDs}
	</div>
{/if}

<div class="flex px-4 py-2 justify-between">
	<button
		class="btn variant-filled-primary"
		on:click={() => {
			data.set(get(temp_data));
		}}
	>
		SAVE to storage
	</button>

	<div>
		<button
			class="btn variant-filled-warning"
			data-sveltekit-reload
			on:click={() => {
				$temp_data = slotsData_test_SlotInfos;
			}}
		>
			Load Test Data
		</button>

		<button
			class="btn variant-filled-warning"
			data-sveltekit-reload
			on:click={() => {
				window.localStorage.clear();
				$temp_data = slotsData_SlotInfos;
			}}
		>
			Reset Everything
		</button>
	</div>
</div>

<!-- <pre style="background: #eee">{JSON.stringify(data.value, null, 2)}</pre> -->
<!-- <pre style="background: #eee">{JSON.stringify(aliasData_temp, null, 2)}</pre> -->
