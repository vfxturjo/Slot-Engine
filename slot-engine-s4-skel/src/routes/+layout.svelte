<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl">SlotEngine</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a class="btn btn-sm variant-ghost-surface" href="/rendering">Rendering</a>
				<a class="btn btn-sm variant-ghost-surface" href="/testingArena">TestingArena</a>
				<a class="btn btn-sm variant-ghost-surface" href="/PeopleData">PeopleData</a>
				<a class="btn btn-sm variant-ghost-surface" href="/SlotData">SlotData</a>
				<a class="btn btn-sm variant-ghost-surface" href="/useCheck">useCheck</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
