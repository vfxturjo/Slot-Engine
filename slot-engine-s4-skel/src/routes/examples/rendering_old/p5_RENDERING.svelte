<script lang="ts">
	import Matter from 'matter-js';
	import type { p5 } from 'p5-svelte';
	import { Ground } from './classes/Ground';
	import { Circle } from './classes/Circle';
	import MatterAttractors from 'matter-attractors';
	import {
		createMatterScene,
		addMouseControl,
		createMatterAttractorScene,
		addRandomBodies,
		cleanUpMatter
	} from './Matter_SIMULATING';

	Matter.use(MatterAttractors);

	export let canvas: HTMLCanvasElement;

	const engine = Matter.Engine.create();
	const world = engine.world;

	const circles: Circle[] = [];
	const ground = new Ground(400, 590, 800, 20, world);

	createMatterScene(engine);
	let [mouse, mouseConstraint] = addMouseControl(engine, canvas);
	addRandomBodies(engine);
	createMatterAttractorScene(engine, mouse);

	sketch = new p5((p: p5) => {
		p.setup = () => {
			p.createCanvas(800, 600).parent(canvas);
		};

		p.draw = () => {
			p.background(220);
			Matter.Engine.update(engine);

			ground.show(p);

			circles.forEach((circle) => {
				circle.show(p);
			});
		};
	});

	export function addNewCircle() {
		const x = Math.random() * 800;
		const y = 50;
		const r = 20 + Math.random() * 30;
		const circle = new Circle(x, y, r, world);
		circles.push(circle);
	}
</script>

<P5 {sketch} />
