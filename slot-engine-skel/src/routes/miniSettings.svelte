<script lang="ts">
	import { LocalStorage } from '$lib/localStorageClass.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import Label from '$lib/components/ui/label/label.svelte';

	let config_show_id = new LocalStorage('config_show_id', false);
	// $inspect(config_show_id.value);
</script>

<div class="flex items-center space-x-2">
	<Switch id="show-id" bind:checked={config_show_id.value} />
	<Label for="show-id">Show ID</Label>
</div>
