<script lang="ts">
	import P5, { type Sketch } from 'p5-svelte';
	import * as knobby from '@thenbe/svelte-knobby';
	import type { Vector } from 'p5';
	import type walker from './walker';

	let walker1: walker;

	const opts = knobby.panel({
		strokeWeight: { value: 20, min: 1, max: 20 },
		speed: { value: 5, min: 1, max: 20 },

		setValues: () => {
			walker1.size = $opts.strokeWeight;
			walker1.speed = $opts.speed;

			console.log(walker1.size);
			console.log(walker1.speed);
		}

		//#region helpers
		// // key value or function
		// speed: { value: 1, min: 0.01, max: 10, step: 0.1 },
		// clean: () => {
		// 	console.log('doing');
		// 	clean_canvas_out();
		// }
		//#endregion
	});

	const sketch: Sketch = async (p5) => {
		// let walker = (await import('./walker')).default;
		// walker1 = new walker({ x: 0, y: 0, size: $opts.strokeWeight });

		let randomCounts: number[] = [];
		let total = 20;
		let barSize: number;

		p5.setup = async () => {
			// cnv = p5.createCanvas(400, 400);
			// p5.createCanvas(400, 400);
			p5.frameRate(60);
			p5.createCanvas(400, 400);
			p5.background('black');
			for (let i = 0; i < total; i++) {
				randomCounts[i] = 0;
			}
			barSize = p5.width / total;
		};

		p5.draw = () => {
			p5.fill(255);
			for (let i = 0; i < total; i++) {
				randomCounts[i] += p5.random();
				p5.rect(i * barSize, p5.height, barSize, -randomCounts[i]);
			}
		};
	};
</script>

<P5 {sketch} />
