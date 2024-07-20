<!-- adapted from https://github.com/tonyketcham/p5-svelte -->
<script lang="ts">
	import Matter from 'matter-js';
	import P5, { type Sketch } from 'p5-svelte';
	import * as knobby from '@thenbe/svelte-knobby';

	const opts = knobby.panel({
		width: { value: 55, min: 100, max: 1000 },
		height: { value: 55, min: 100, max: 1000 },
		color: '#ff3e00',
		updating: true,

		clean: () => {
			updating = !updating;
		}
	});

	const sketch = (p5) => {
		p5.setup = () => {
			p5.createCanvas(400, 400);

			// create an engine
			let engine = Matter.Engine.create();
			let world = engine.world;

			// create two boxes and a ground
			blockA = new Block(world, { x: 200, y: 200, w: 80, h: 80, color: 'white' });
			blockB = new Block(world, { x: 270, y: 50, w: 160, h: 80, color: 'white' });
			ground = new Block(
				world,
				{ x: 400, y: 500, w: 810, h: 15, color: 'grey' },
				{ isStatic: true, angle: PI / 36 }
			);

			// run the engine
			Matter.Runner.run(engine);
		};

		p5.draw = () => {
			if (!$opts.updating) return;

			p5.clear();
			p5.fill($opts.color);

			background('black');
			blockA.draw();
			blockB.draw();
			ground.draw();
		};
	};
</script>

<P5 {sketch} />
