<script lang="ts">
	function addRow() {
		data = [...data, newRow];
		newRow = [...newColumnData];
	}
	function deleteRow(rowToBeDeleted: Array<string>) {
		data = data.filter((row) => row != rowToBeDeleted);
	}

	export let columns = ['Test_Name', 'Test_Email', 'Test_Phone Number'];
	export let newColumnData = ['Test_Name', 'Test_Email', 'Test_Phone Number'];
	export let data = [
		['T_John', 'T_john@example.com', 'T_(353) 01 222 3333'],
		['T_Sarah', 'T_sarah@gmail.com', 'T_(01) 22 888 4444'],
		['T_Afshin', 'T_afshin@mail.com', 'T_(353) 22 87 8356']
	];
	export let editable = true;
	export let debug_data = false;

	let newRow = [...newColumnData];
</script>

<div class={`w-full overflow-x-auto rounded shadow-md sm:rounded-lg ${$$restProps.class}`}>
	<table class="w-full table-auto text-center text-sm text-gray-500 dark:text-gray-400">
		<thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
			<tr>
				{#each columns as column, index}
					<th class="px-6 py-3">{column}</th>
				{/each}
				{#if editable}
					<th scope="col" class="px-6 py-3">
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
								on:click={() => deleteRow(row)}>X</button
							>
						</td>
					</tr>
				{/each}
				<tr class="bg-gray-200">
					{#each newRow as column, index}
						<td
							class=" px-6 py-4 text-gray-400 focus:text-black"
							contenteditable="plaintext-only"
							bind:innerHTML={newRow[index]}
						></td>
					{/each}
					<td>
						<button
							class="font-medium text-blue-600 hover:underline dark:text-blue-500"
							on:click={addRow}>+</button
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
