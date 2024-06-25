<script lang="ts">
	import { get } from 'svelte/store';
	import { persisted } from 'svelte-persisted-store';
	import TablewithmultiSelect from '$lib/Components/table with multiSelect.svelte';
	import convertArrayToCSV from 'convert-array-to-csv';
	import { donwloadBlob, remove_localStorage_items_with_prefix } from '$lib/usefulFuncs';
	import {
		ConvertCSVToArrayOfArrays,
		findDuplicateFromList,
		handleFileInputAsText
	} from '$lib/usefulFuncs';
	import {
		slotsData_defaultColumns,
		slotsData_defaultColumns_types,
		slotsData_default_SlotInfos,
		slotsData_newRow,
		Instruments_list,
		// testing
		slotsData_test_SlotInfos,
		Performance_types
	} from '../../lib/Defaults/defaultValues';

	let columns = persisted('slotsData-columns', slotsData_defaultColumns);
	let columns_types = persisted('slotsData-columnsTypes', slotsData_defaultColumns_types);
	let temp_data = persisted('slotsData-slotInfos_temp', slotsData_default_SlotInfos);
	let data = persisted('slotsData-slotInfos', slotsData_default_SlotInfos);

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
		handleFileInputAsText(files).then((text) => {
			let [columns_imported, ...data_imported] = JSON.parse(text);
			$temp_data = data_imported;
		});
	}

	function exportData() {
		donwloadBlob(JSON.stringify([$columns, ...$temp_data]), 'slots_data.json');
	}
</script>

<div class="py-8"></div>
<p class="h2 p-2 text-center">Slot Info</p>

<div class="p-2">
	<div
		class="flex items-center justify-center p-2 w-full [&>*]:px-2 bg-black bg-opacity-10 rounded"
	>
		<p>JSON:</p>
		<input class="input w-60" accept=".json" type="file" bind:files />
		<span> </span>
		<button class="btn variant-filled" on:click={exportData}> Export </button>
	</div>

	<TablewithmultiSelect
		--min-width="850px"
		class="py-2"
		columns={$columns}
		columns_types={$columns_types}
		multiSelect_selectOptions={[
			null,
			null,
			Performance_types,
			null,
			null,
			Instruments_list,
			Instruments_list
		]}
		newColumnData={[String(highestID + 1), ...slotsData_newRow[0].slice(1)]}
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
				console.log($temp_data);
				console.log(get(data));
			}}
		>
			log
		</button>

		<button
			class="btn variant-filled-warning"
			data-sveltekit-reload
			on:click={() => {
				$temp_data = JSON.parse(JSON.stringify(get(data)));
			}}
		>
			Undo Changes
		</button>

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
				$temp_data = slotsData_default_SlotInfos;
				remove_localStorage_items_with_prefix('slotsData');
			}}
		>
			Reset
		</button>
	</div>
</div>

<!-- <pre style="background: #eee">{JSON.stringify(data.value, null, 2)}</pre> -->
<!-- <pre style="background: #eee">{JSON.stringify(aliasData_temp, null, 2)}</pre> -->
