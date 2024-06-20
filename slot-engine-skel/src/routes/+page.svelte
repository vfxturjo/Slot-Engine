<script lang="ts">
	import { LocalStorage } from '$lib/localStorageClass.svelte';
	import Settings from './miniSettings.svelte';
	import UsingTable from './using table.svelte';
	import { findDuplicateFromList } from '$lib/usefulFuncs';

	let columns = new LocalStorage('pepsData-columns', [
		'id',
		'Alias',
		'Name',
		'Dept',
		'Batch',
		'Phone'
	]);
	let data = new LocalStorage('pepsData-pepInfos', [
		// id (hidden, only for backend), Name, Dept, Batch, Phone
		['1', 'Turjo', 'URP', '18', '01758524262'],
		['2', 'Slot', 'CSE', '19', '01758524262'],
		['3', 'Engine', 'ME', '20', '01758524262']
	]);

	let aliasData_temp = $derived(
		data.value.map((row, index) => {
			// returning ID and Alias
			return [row[0], `${row[1]} ${row[2]}'${row[3]}`];
		})
	);

	let conflicting_alias_IDs = $derived(
		findDuplicateFromList(
			data.value.map((row) => {
				return row[0];
			})
		)
	);

	let aliasData = new LocalStorage('pepsData-aliases', [
		[1, "Turjo URP'18"],
		[1, "Slot CSE'19"],
		[1, "Engine ME'20"]
	]);
</script>

<a href="/settings">Open Settings Page</a>
<Settings></Settings>

<div class="p-2">
	<UsingTable bind:columns={columns.value} bind:data={data.value} />
</div>

{#if conflicting_alias_IDs.length != 0}
	<div class="bg-red-800 text-yellow-300">
		Conflicting Alias IDs: {conflicting_alias_IDs}
	</div>
{/if}

<!-- <pre style="background: #eee">{JSON.stringify(data.value, null, 2)}</pre> -->
<pre style="background: #eee">{JSON.stringify(aliasData_temp, null, 2)}</pre>

<div>
	<div>Current Aliases</div>
	<UsingTable editable={false} columns={['ID', 'Alias']} data={aliasData.value}></UsingTable>
</div>
