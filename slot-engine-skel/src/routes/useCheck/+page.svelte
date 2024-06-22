<script lang="ts">
	import MultiSelect from 'svelte-multiselect';

	const ui_libs = [`Svelte`, `React`, `Vue`, `Angular`, `...`];

	let selected: Array<string> = $state([]);
</script>

Favorite Frontend Tools?

<code>selected = {JSON.stringify(selected)}</code>

<MultiSelect bind:selected options={ui_libs} />
