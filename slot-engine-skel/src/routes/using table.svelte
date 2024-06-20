<script>
	function addRow() {
		// data = [...data, newRow];
		data.push(newRow);
		newRow = [...columns];
	}
	function deleteRow(rowToBeDeleted) {
		data = data.filter((row) => row != rowToBeDeleted);
	}

	let {
		columns = $bindable(['Test_Name', 'Test_Email', 'Test_Phone Number']),
		data = $bindable([
			['T_John', 'T_john@example.com', 'T_(353) 01 222 3333'],
			['T_Sarah', 'T_sarah@gmail.com', 'T_(01) 22 888 4444'],
			['T_Afshin', 'T_afshin@mail.com', 'T_(353) 22 87 8356']
		]),
		editable = true,
		debug_data = false
	} = $props();

	// let columns = $state(['Name', 'Email', 'Phone Number']);
	// let data = $state([
	// 	['John', 'john@example.com', '(353) 01 222 3333'],
	// 	['Sarah', 'sarah@gmail.com', '(01) 22 888 4444'],
	// 	['Afshin', 'afshin@mail.com', '(353) 22 87 8356']
	// ]);
	let newRow = $state([...columns]);
</script>

<div class="w-full overflow-x-auto rounded shadow-md sm:rounded-lg">
	<table
		class="w-full table-auto text-center text-sm text-gray-500 rtl:text-right dark:text-gray-400"
	>
		<thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
			<tr>
				{#each columns as column, index}
					<th class="px-6 py-3">{column}</th>
				{/each}
				<th scope="col" class="px-6 py-3">
					<span class="sr-only">Edit</span>
				</th>
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
							<td
								class="px-6 py-4"
								contenteditable="plaintext-only"
								bind:innerHTML={row[cellIndex]}
							>
							</td>
						{/each}
						<td>
							<button
								class="font-medium text-blue-600 hover:underline dark:text-blue-500"
								onclick={() => deleteRow(row)}>X</button
							>
						</td>
					</tr>
				{/each}
				<tr style="color: grey">
					{#each newRow as column, index}
						<td class="px-6 py-4" contenteditable="plaintext-only" bind:innerHTML={newRow[index]}
						></td>
					{/each}
					<td>
						<button
							class="font-medium text-blue-600 hover:underline dark:text-blue-500"
							onclick={addRow}>+</button
						>
					</td>
				</tr>
			</tbody>
		{:else}
			<!-- IF TABLE IS NOT EDITABLE -->
			<tbody>
				{#each data as row, rowIndex}
					<tr
						class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
					>
						{#each row as cell, cellIndex}
							<td class="px-6 py-4">{row[cellIndex]} </td>
						{/each}
					</tr>
				{/each}
			</tbody>
		{/if}
	</table>
</div>
{#if debug_data}
	<br />
	<pre style="background: #eee">{JSON.stringify(data, null, 2)}</pre>
{/if}

<style>
	tr td:focus {
		outline: none;
		border-color: rgba(0, 255, 64, 0.5);
		box-shadow: inset 0 0 6px rgba(0, 255, 64, 0.5);
		/* background: #eee; */
	}
</style>
