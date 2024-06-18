<script lang="ts">
	import UsingTable from './using table.svelte';

	import { localStore } from '$lib/localStore.svelte';
	let count = localStore('peopleData', 0);

	let columns = $state(['Alias', 'Name', 'Dept', 'Batch', 'Phone']);
	let data = $state([
		// id (hidden, only for backend), Name, Dept, Batch, Phone
		[1, 'Turjo', 'URP', '18', '01758524262'],
		[2, 'Slot', 'CSE', '19', '01758524262'],
		[3, 'Engine', 'ME', '20', '01758524262']
	]);
	let aliases = $derived(
		data.map((row) => {
			return row[1] + ' ' + row[2] + "'" + row[3];
		})
	);
	$inspect(aliases);
</script>

<div class="p-2">
	<UsingTable bind:columns bind:data />
</div>

<button onclick={() => count.value++}>{count.value}</button>
<pre style="background: #eee">{JSON.stringify(data, null, 2)}</pre>
