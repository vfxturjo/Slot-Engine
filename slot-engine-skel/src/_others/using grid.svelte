<script>
	function addRow() {
		data = [...data, [...newRow]];
		newRow = columns.map(() => '');
	}
	function deleteRow(rowToBeDeleted) {
		data = data.filter((row) => row !== rowToBeDeleted);
	}
	let columns = $state(['Name', 'Email', 'Phone Number']);
	let data = $state([
		['John', 'john@example.com', '(353) 01 222 3333'],
		['Sarah', 'sarah@gmail.com', '(01) 22 888 4444'],
		['Afshin', 'afshin@mail.com', '(353) 22 87 8356']
	]);
	let newRow = $state(columns.map(() => ''));

	let columns_length = $derived(columns.length);
	console.log(columns.length);
	$inspect(columns_length, data.length);
</script>

<div
	class="grid gap-1 bg-slate-500 *:border *:border-black"
	style="grid-template-columns: repeat({columns.length}, minmax(0, 1fr));"
>
	{#each columns as column, index}
		<div class="font-bold">{column}</div>
	{/each}

	{#each data as row, rowIndex}
		{#each row as cell, cellIndex}
			<div class="" contenteditable="plaintext-only" bind:innerHTML={row[cellIndex]}></div>
		{/each}
	{/each}

	{#each newRow as column, index}
		<div contenteditable="plaintext-only" bind:innerHTML={newRow[index]}></div>
	{/each}
</div>

<button
	class="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
	onclick={addRow}>Add Row</button
>
<button
	class="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
	onclick={() => deleteRow(data[data.length - 1])}>Delete Last Row</button
>

<pre>{JSON.stringify(data)}</pre>

<div class="grid grid-cols-4 gap-4">
	<div>01</div>
	<!-- ... -->
	<div>09</div>
</div>

<style>
	div:focus {
		background: #eee;
		outline: none;
	}
</style>
