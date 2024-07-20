<script lang="ts">
	import { onMount } from 'svelte';
	import Matter from 'matter-js';

	let Ground, Circle;

	// import {
	// 	addMouseControl,
	// 	createMatterScene,
	// 	addRandomBodies,
	// 	createMatterAttractorScene
	// } from './doingMatter';
	import MatterAttractors from 'matter-attractors';

	let canvas: HTMLCanvasElement;
	let engine: Matter.Engine;
	let world: Matter.World;

	let p5: p5;
	let sketch;

	let circles: Circle[] = [];
	let ground: Ground;

	async function loadModules() {
		p5 = (await import('p5')).default;
		Ground = (await import('./classes/Ground')).default;
		Circle = (await import('./classes/Circle')).default;
	}

	onMount(async () => {
		await loadModules();

		// Create an engine
		Matter.use(MatterAttractors);
		engine = Matter.Engine.create();
		world = engine.world;

		ground = new Ground(400, 590, 800, 20, world);

		// createMatterScene(engine);
		// let [mouse, mouseConstraint] = addMouseControl(engine, canvas);
		// addRandomBodies(engine);
		// createMatterAttractorScene(engine, mouse);

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

		return () => {
			// Clean up on component unmount
			Matter.World.clear(world, false);
			Matter.Engine.clear(engine);
		};
	});

	function addNewCircle() {
		const x = Math.random() * 800;
		const y = 50;
		const r = 20 + Math.random() * 30;
		const circle = new Circle(x, y, r, world);
		circles.push(circle);
	}
</script>

<canvas bind:this={canvas} class="w-[800px] h-[600px] border-white border"></canvas>
<button on:click={addNewCircle}>Add new circle</button>

<style>
	button {
		margin-top: 10px;
		padding: 10px 20px;
		font-size: 16px;
		background-color: #4caf50;
		color: white;
		border: none;
		cursor: pointer;
		border-radius: 5px;
	}

	button:hover {
		background-color: #45a049;
	}
</style>
