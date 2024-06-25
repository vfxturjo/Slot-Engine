<script lang="ts">
	import { onMount } from 'svelte';
	import Matter from 'matter-js';
	import {
		addMouseControl,
		createMatterScene,
		addRandomBodies,
		createMatterAttractorScene
	} from './doingMatter';
	import MatterAttractors from 'matter-attractors';

	let canvas: HTMLCanvasElement;
	let engine: Matter.Engine;
	let render: Matter.Render;
	let world;

	onMount(() => {
		// Create an engine
		Matter.use(MatterAttractors);
		engine = Matter.Engine.create();
		world = engine.world;

		// Create a renderer
		render = Matter.Render.create({
			canvas: canvas,
			engine: engine,
			options: {
				width: 800,
				height: 600,
				wireframes: false,
				background: '#f0f0f0'
			}
		});

		createMatterScene(engine);
		let [mouse, mouseConstraint] = addMouseControl(engine, canvas);
		addRandomBodies(engine);
		createMatterAttractorScene(engine, mouse);

		// Run the engine
		let runner = Matter.Runner.create();
		Matter.Runner.run(runner, engine);

		// Run the renderer
		Matter.Render.run(render);

		return () => {
			// Clean up on component unmount
			Matter.Render.stop(render);
			Matter.Runner.stop(runner);
			Matter.Engine.clear(engine);
		};
	});

	function addCircle() {
		const circle = Matter.Bodies.circle(
			Math.random() * 800, // Random x position
			50, // y position (near the top)
			20 + Math.random() * 30, // Random radius between 20 and 50
			{
				restitution: 0.7,
				friction: 0.01,
				render: {
					fillStyle: `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`
				}
			}
		);
		Matter.Composite.add(world, circle);
	}
</script>

<canvas bind:this={canvas}></canvas>
<button on:click={addCircle}>Add new circle</button>

<style>
	canvas {
		border: 1px solid black;
		max-width: 100%;
		height: auto;
	}

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
