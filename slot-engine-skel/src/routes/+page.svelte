<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import { LocalStorage } from '$lib/localStorageClass.svelte';
	import { findDuplicateFromList } from '$lib/usefulFuncs';
	import UsingTable from './using table.svelte';

	let columns = new LocalStorage('pepsData-columns', ['id', 'Name', 'Dept', 'Batch', 'Phone']);
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

	let aliasData = new LocalStorage('pepsData-aliases', [
		['1', "Turjo URP'18"],
		['2', "Slot CSE'19"],
		['3', "Engine ME'20"]
	]);

	let conflicting_alias_IDs = $derived(
		findDuplicateFromList(
			data.value.map((row) => {
				return row[0];
			})
		)
	);

	let highestID = $derived(
		Math.max(
			...data.value.map((row) => {
				return parseInt(row[0]);
			})
		)
	);
</script>

<a href="/useCheck">Open CHECKING Page</a><br />
<a href="/settings">Open Settings Page</a>

<div class="p-2">
	<UsingTable
		editable={true}
		newColumnData={[String(highestID + 1), ...columns.value.slice(1)]}
		bind:columns={columns.value}
		bind:data={data.value}
		checkConflictForDataIndex={[0]}
	/>
</div>

{#if conflicting_alias_IDs.length != 0}
	<div class="bg-red-800 text-yellow-300">
		Conflicting Alias IDs: {conflicting_alias_IDs}
	</div>
{/if}

<Button
	onclick={() => {
		aliasData.value = aliasData_temp;
	}}
>
	SAVE to storage
</Button>
<Button
	data-sveltekit-reload
	onclick={() => {
		window.localStorage.clear();
	}}
>
	Reset Everything
</Button>

<!-- <pre style="background: #eee">{JSON.stringify(data.value, null, 2)}</pre> -->
<!-- <pre style="background: #eee">{JSON.stringify(aliasData_temp, null, 2)}</pre> -->

<div>
	<div>Current Aliases</div>
	<UsingTable editable={false} columns={['ID', 'Alias']} data={aliasData.value}></UsingTable>
</div>
