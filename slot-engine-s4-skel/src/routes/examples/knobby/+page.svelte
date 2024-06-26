<!-- adapted from https://github.com/tonyketcham/p5-svelte -->
<script lang="ts">
	import P5, { type Sketch } from 'p5-svelte';
	import * as knobby from '@thenbe/svelte-knobby';

	let sketch: Sketch;

	const opts = knobby.panel({
		width: { value: 55, min: 100, max: 1000 },
		height: { value: 55, min: 100, max: 1000 },
		color: '#ff3e00',
		updating: true,

		clean: () => {
			updating = !updating;
		}
	});

	sketch = (p5) => {
		p5.setup = () => {
			p5.createCanvas(400, 400);
		};

		p5.draw = () => {
			if (!$opts.updating) return;

			p5.clear();
			p5.fill($opts.color);
			p5.ellipse(p5.width / 2, p5.height / 2, $opts.width, $opts.height);
		};
	};
</script>

<P5 {sketch} />
