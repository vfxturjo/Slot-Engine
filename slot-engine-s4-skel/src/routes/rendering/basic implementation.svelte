<script lang="ts">
	import { onMount } from 'svelte';
	import Matter from 'matter-js';

	let canvas: HTMLCanvasElement;
	let engine: Matter.Engine;
	let render: Matter.Render;
	let world;

	onMount(() => {
		// Create an engine
		engine = Matter.Engine.create();
		world = engine.world;

		// Create a renderer
		render = Matter.Render.create({
			canvas: canvas,
			engine: engine,
			options: {
				width: 800,
				height: 600,
				wireframes: false
			}
		});

		// Create a ground
		const ground = Matter.Bodies.rectangle(400, 590, 800, 20, { isStatic: true });

		// Add ground to the world
		Matter.Composite.add(world, ground);

		// Run the engine
		let runner = Matter.Runner.create();
		Matter.Runner.run(runner, engine);

		// Run the renderer
		Matter.Render.run(render);

		return () => {
			// Clean up on component unmount
			Matter.Render.stop(render);
			Matter.Runner.stop(engine);
			Matter.Engine.clear(engine);
		};
	});

	function addCircle() {
		const circle = Matter.Bodies.circle(
			Math.random() * 800, // Random x position
			50, // y position (near the top)
			20 + Math.random() * 30, // Random radius between 20 and 50
			{
				restitution: 0.5,
				friction: 0.005,
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
	}

	button {
		margin-top: 10px;
	}
</style>
