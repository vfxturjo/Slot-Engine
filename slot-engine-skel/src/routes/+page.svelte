<script lang="ts">
	import localStorageClass from '$lib/localStorageClass.svelte';
	import UsingTable from './using table.svelte';

	let columns = new localStorageClass('pepsData-columns', [
		'id',
		'Alias',
		'Name',
		'Dept',
		'Batch',
		'Phone'
	]);
	let data = new localStorageClass('pepsData-pepInfos', [
		// id (hidden, only for backend), Name, Dept, Batch, Phone
		[1, 'Turjo', 'URP', '18', '01758524262'],
		[2, 'Slot', 'CSE', '19', '01758524262'],
		[3, 'Engine', 'ME', '20', '01758524262']
	]);
</script>



<div class="p-2">
	<UsingTable bind:columns={columns.value} bind:data={data.value} />
</div>

<!-- <pre style="background: #eee">{JSON.stringify(data.value, null, 2)}</pre> -->
