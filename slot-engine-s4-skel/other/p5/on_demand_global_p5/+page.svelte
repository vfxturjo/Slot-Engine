<script lang="ts">
	let max_distance: number;

	function setup() {
		createCanvas(710, 400);
		noStroke();
		max_distance = dist(0, 0, width, height);
	}

	function draw() {
		background(0);
		for (let i = 0; i <= width; i += 20) {
			for (let j = 0; j <= height; j += 20) {
				let size = dist(mouseX, mouseY, i, j);
				size = (size / max_distance) * 66;
				ellipse(i, j, size, size);
			}
		}
	}

	///--- P5-Kit scaffolding stuff starts here. ---///

	// @hmr:keep-all
	import { globalOnDemandP5 } from '$lib/on-demand-p5/global-onDemand-p5';
	globalOnDemandP5({ setup, draw }, 'p5-sketch');

	let sketch;

	let mouseMode = 'wander'; // 'control', 'follow'

	let mouseX, maxMouseX;
	let mouseY, maxMouseY;

	function handleMousemove(e) {
		if (mouseMode == 'follow') {
			const rect = sketch.getBoundingClientRect();
			mouseX = e.clientX - rect.left;
			mouseY = e.clientY - rect.top;
		}
	}

	function handleClick(e) {
		if (e.ctrlKey) {
			mouseMode = mouseMode == 'follow' ? 'control' : 'follow';
			handleMousemove(e);
		}
		if (e.altKey) {
			mouseMode = mouseMode == 'wander' ? 'control' : 'wander';
		}
	}

	let t = 0;
	function step(ts) {
		if (mouseMode == 'wander') {
			t += 10;
			mouseX = ((Math.cos(t / 1009) + 1) / 2) * maxMouseX;
			mouseY = ((Math.sin(t / 1549) + 1) / 2) * (maxMouseY - 4);
		}
		requestAnimationFrame(step);
	}

	if (typeof window != 'undefined') {
		requestAnimationFrame(step);
	}
</script>

<svelte:body on:mousemove={handleMousemove} on:click={handleClick} />

<div class="flex-wrap">
	<main>
		<div
			id="p5-sketch"
			bind:this={sketch}
			bind:clientWidth={maxMouseX}
			bind:clientHeight={maxMouseY}
		/>
		<div class="panel">
			<p>Based on:</p>
			<p>Mouse Mode: {mouseMode}</p>
			<p>
				<label>
					mouseX
					<input type="range" bind:value={mouseX} min="0" max={maxMouseX} step="10" />
					{mouseX?.toFixed(2)}
				</label>
			</p>
			<p>
				<label>
					mouseY
					<input type="range" bind:value={mouseY} min="0" max={maxMouseY - 4} step="10" />
					{mouseY?.toFixed(2)}
				</label>
			</p>
		</div>
	</main>
</div>

<style>
	:global(body) {
		margin: 0;
		background-image: url(/img/wild_oliva.png);
		font-family: sans-serif;
	}

	.flex-wrap {
		height: 100vh;

		display: grid;
		place-items: center;
	}

	.panel {
		background-color: #fefefe;
		padding: 0.4em;
	}
</style>
