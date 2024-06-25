<script lang="ts">
	import TablewithMultiSelect from '$lib/Components/table with multiSelect.svelte';
	import { persisted } from 'svelte-persisted-store';
	import { get } from 'svelte/store';
	import convertArrayToCSV from 'convert-array-to-csv';
	import { donwloadBlob, remove_localStorage_items_with_prefix } from '$lib/usefulFuncs';
	import {
		ConvertCSVToArrayOfArrays,
		findDuplicateFromList,
		handleFileInputAsText
	} from '$lib/usefulFuncs';
	import {
		pepsData_defaultAliases,
		pepsData_defaultColumns,
		pepsData_pepInfos,
		// testing
		pepsData_test_Aliases,
		pepsData_test_PepInfos
	} from '../../lib/Defaults/defaultValues';

	let columns = pepsData_defaultColumns;
	let data = persisted('pepsData-pepInfos', pepsData_pepInfos);
	let temp_data = persisted('pepsData-pepInfos_temp', pepsData_pepInfos);

	$: temp_aliasData = $temp_data.map((row, index) => {
		// returning ID and Alias
		return [row[0], `${row[1]} ${row[2]}'${row[3]}`];
	});

	let aliasData = persisted('pepsData-aliases', pepsData_defaultAliases);

	$: conflicting_alias_IDs = findDuplicateFromList(
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
			let [columns_imported, data_imported] = ConvertCSVToArrayOfArrays(text, ',');
			$temp_data = data_imported;
		});
	}

	function exportData() {
		donwloadBlob(
			convertArrayToCSV($temp_data, {
				header: columns,
				seperator: ','
			}),
			'people_data.csv'
		);
	}
</script>

<div class="flex flex-col align-middle justify-center w-full">
	<p class="h2 p-2 text-center">Current Aliases</p>
	<br />
	<TablewithMultiSelect
		--min-width="500px"
		editable={false}
		columns={['ID', 'Alias']}
		data={$aliasData.map((row) => {
			return [row.value, row.label];
		})}
	></TablewithMultiSelect>
</div>

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
	<TablewithMultiSelect
		class="py-2"
		columns_types={['string', 'string', 'string', 'string', 'string']}
		editable={true}
		newColumnData={[String(highestID + 1), ...columns.slice(1)]}
		bind:columns
		bind:data={$temp_data}
	/>
</div>

{#if conflicting_alias_IDs.length != 0}
	<div class="bg-red-800 text-yellow-300">
		Conflicting Alias IDs: {conflicting_alias_IDs}
	</div>
{/if}

<div class="flex px-4 py-2 justify-between">
	<button
		class="btn variant-filled-primary"
		on:click={() => {
			// aliasData.set(temp_aliasData);
			data.set(get(temp_data));
			aliasData.set(
				temp_aliasData.map((row) => {
					return { value: row[0], label: row[1] };
				})
			);
		}}
	>
		SAVE to storage
	</button>

	<div>
		<button
			class="btn variant-filled-warning"
			data-sveltekit-reload
			on:click={() => {
				$temp_data = get(data);
			}}
		>
			Undo Changes
		</button>
		<button
			class="btn variant-filled-warning"
			data-sveltekit-reload
			on:click={() => {
				$temp_data = pepsData_test_PepInfos;
				aliasData.set(pepsData_test_Aliases);
			}}
		>
			Load Test Data
		</button>

		<button
			class="btn variant-filled-warning"
			data-sveltekit-reload
			on:click={() => {
				// window.localStorage.clear();
				$temp_data = pepsData_pepInfos;
				remove_localStorage_items_with_prefix('pepsData');
				$aliasData = pepsData_defaultAliases;
			}}
		>
			Reset Everything
		</button>
	</div>
</div>

<!-- <pre style="background: #eee">{JSON.stringify(data.value, null, 2)}</pre> -->
<!-- <pre style="background: #eee">{JSON.stringify(aliasData_temp, null, 2)}</pre> -->
