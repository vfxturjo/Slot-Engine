import { onMount } from 'svelte';

export function globalOnDemandP5(methods, parent) {
	onMount(async function () {
		const { default: p5 } = await import('p5');

		// Remove P5 global instance (if it exists).
		if (typeof remove == 'function') {
			remove();
		}

		for (const methodName in methods) {
			window[methodName] = methods[methodName];
		}

		// (Re)start P5.js in on-demand global mode.
		new p5(null, parent);
	});
}

export default globalOnDemandP5;
