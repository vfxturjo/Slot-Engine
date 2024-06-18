<script>
	function addRow() {
		data = [...data, [...newRow]];
		newRow = columns;
	}
	function deleteRow(rowToBeDeleted) {
		data = data.filter((row) => row != rowToBeDeleted);
	}
	let columns = $state(['Name', 'Email', 'Phone Number']);
	let data = $state([
		['John', 'john@example.com', '(353) 01 222 3333'],
		['Sarah', 'sarah@gmail.com', '(01) 22 888 4444'],
		['Afshin', 'afshin@mail.com', '(353) 22 87 8356']
	]);
	let newRow = $state([...columns]);
</script>

<table class="table-auto">
	<thead>
		<tr>
			{#each columns as column, index}
				<th>{column}</th>
			{/each}
		</tr>
	</thead>

	<tbody class="gap-2 border">
		{#each data as row, rowIndex}
			<tr>
				{#each row as cell, cellIndex}
					<td contenteditable="plaintext-only" bind:innerHTML={row[cellIndex]}> </td>
				{/each}
				<td>
					<button onclick={() => deleteRow(row)}>X</button>
				</td>
			</tr>
		{/each}
		<tr style="color: grey">
			{#each newRow as column, index}
				<td contenteditable="plaintext-only" bind:innerHTML={newRow[index]}></td>
			{/each}
			<td>
				<button onclick={addRow}>add</button>
			</td>
		</tr>
	</tbody>
</table>
<pre style="background: #eee">{JSON.stringify(data, null, 2)}</pre>

<style>
	tr td:focus {
		background: #eee;
	}
</style>
