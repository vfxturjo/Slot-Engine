<script lang="ts">
	import { MultiSelect } from 'svelte-multiselect';

	// general settings
	export let editable = true;
	export let enable_new_row = editable;
	export let debug_data = false;

	// Column settings
	export let columns = ['Test_Name', 'Test_Email', 'Test_Phone Number', 'multiSelect'];
	export let columns_types = ['string', 'string', 'string', 'multiSelect'];
	export let newColumnData: Array<string | string[] | number[] | never | []> = [
		'Test_Name',
		'Test_Email',
		'Test_Phone Number',
		[]
	];

	// multiSelect settings
	export let multiSelect_selectOptions: Array<
		null | undefined | Array<string> | Array<{ label: string; value: number }>
	> = [
		,
		,
		,
		[
			{ label: 'option 1', value: 1 },
			{ label: 'option 2', value: 2 },
			{ label: 'option 3', value: 3 }
		]
	];

	// table Data
	export let data: (string | number[] | {}[])[] = [
		['T_John', 'T_john@example.com', 'T_(353) 01 222 3333', []],
		['T_Sarah', 'T_sarah@gmail.com', 'T_(01) 22 888 4444', []],
		['T_Afshin', 'T_afshin@mail.com', 'T_(353) 22 87 8356', []]
	];

	/////////////////////////////////////
	/////////////////////////////////////
	/////////////////////////////////////

	let newRow = [...newColumnData];

	// Edit handlers
	async function addRow() {
		data = [...data, newRow];
		await new Promise((r) => setTimeout(r, 10));
		newRow = [...newColumnData];
	}
	function deleteRow(rowToBeDeleted: Array<string>) {
		data = data.filter((row) => row != rowToBeDeleted);
	}
</script>

<div
	class={`flex justify-center overflow-scroll rounded shadow-md sm:rounded-lg ${$$restProps.class}`}
>
	<table
		class="w-fit table-auto text-center text-sm text-gray-500 dark:text-gray-400 overflow-scroll"
		style="min-width: var(--min-width, 200px);"
	>
		<thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
			<tr>
				{#each columns as column, index}
					<th class="px-3 py-3 min-w-5">{column}</th>
				{/each}
				{#if editable}
					<th scope="col" class="px-3 py-3 min-w-5">
						<span class="sr-only">Edit</span>
					</th>
				{/if}
			</tr>
		</thead>

		{#if editable}
			<!-- IF TABLE IS EDITABLE -->
			<tbody>
				{#each data as row, rowIndex}
					<tr
						class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
					>
						{#each row as cell, cellIndex}
							{#if columns_types[cellIndex] == 'singleSelect'}
								<!-- SINGLESELECT TYPE INPUT -->
								<td>
									<MultiSelect
										required={true}
										maxSelect={1}
										--sms-max-width="100px"
										--sms-border="0px"
										options={multiSelect_selectOptions[cellIndex]}
										bind:selected={row[cellIndex]}
										placeholder={columns[cellIndex]}
										minSelect={1}
									>
										<div slot="expand-icon"></div>
									</MultiSelect>
								</td>
							{:else if columns_types[cellIndex] == 'multiSelect'}
								<!-- MULTISELECT TYPE INPUT -->
								<td>
									<MultiSelect
										--sms-max-width="300px"
										options={multiSelect_selectOptions[cellIndex]}
										bind:selected={row[cellIndex]}
										placeholder={columns[cellIndex]}
									></MultiSelect>
								</td>
							{:else}
								<!-- OTHER TYPE INPUT -->
								<td
									class="px-3 py-4"
									contenteditable="plaintext-only"
									bind:innerHTML={row[cellIndex]}
								>
								</td>
							{/if}
						{/each}
						<td class="px-3 py-4">
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<svg
								class="size-4 hover:underline hover:text-red-600 text-gray-400 cursor-pointer"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 448 512"
								on:click={() => deleteRow(row)}
							>
								<!--Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
								<path
									d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
								/>
							</svg>
						</td>
					</tr>
				{/each}
				<!-- NEW ROW ADDER -->
				{#if enable_new_row}
					<tr>
						{#each newRow as column, index}
							{#if columns_types[index] == 'singleSelect'}
								<!-- SINGLESELECT TYPE INPUT -->
								<td>
									<MultiSelect
										required={true}
										maxSelect={1}
										--sms-max-width="100px"
										--sms-border="0px"
										options={multiSelect_selectOptions[index]}
										bind:selected={newRow[index]}
										placeholder={columns[index]}
										minSelect={1}
									>
										<div slot="expand-icon"></div>
									</MultiSelect>
								</td>
							{:else if columns_types[index] == 'multiSelect'}
								<!-- MULTISELECT TYPE INPUT -->
								<td>
									<MultiSelect
										--sms-max-width="300px"
										options={multiSelect_selectOptions[index]}
										bind:selected={newRow[index]}
										placeholder={columns[index]}
									></MultiSelect>
								</td>
							{:else}
								<!-- OTHER TYPE INPUT -->
								<td
									class="px-3 py-4 text-gray-400 focus:text-white"
									on:click={(e) => {
										// remove inner text for first time
										if (
											e.currentTarget.innerHTML == '---' ||
											e.currentTarget.innerHTML == newColumnData[index]
										) {
											e.currentTarget.innerHTML = '';
										}
									}}
									contenteditable="plaintext-only"
									bind:innerHTML={newRow[index]}
								>
								</td>
							{/if}
						{/each}
						<td class="px-3 py-4">
							<button
								on:click={addRow}
								class="size-4 hover:underline hover:text-green-700 text-gray-400 cursor-pointer"
							>
								<svg
									role="button"
									tabindex={0}
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 448 512"
								>
									<!--Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
									<path
										d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
									/>
								</svg>
							</button>
						</td>
					</tr>
				{/if}
			</tbody>
		{:else}
			<!-- IF TABLE IS NOT EDITABLE -->
			<tbody>
				{#each data as row, rowIndex}
					<tr
						class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
					>
						{#each row as cell, cellIndex}
							<td class="px-3 py-4">{row[cellIndex]} </td>
						{/each}
					</tr>
				{/each}
			</tbody>
		{/if}
	</table>
</div>
{#if debug_data}
	<br />
	<pre class="bg-black opacity-50 text-white">{JSON.stringify(data, null, 2)}</pre>
{/if}

<style>
	tr td:focus {
		outline: none;
		border-color: rgba(0, 255, 64, 0.5);
		box-shadow: inset 0 0 6px rgba(0, 255, 64, 0.5);
		/* background: #eee; */
	}
</style>
