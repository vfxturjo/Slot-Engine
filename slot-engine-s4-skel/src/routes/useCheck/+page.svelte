<script lang="ts">
	import P5, { type Sketch } from 'p5-svelte';
	let width = 55;
	let height = 55;
	let x = 0;

	function velocityXY(p5: P5) {
		let dx = p5.mouseX - p5.pmouseX;
		let dy = p5.mouseY - p5.pmouseY;
		p5.line(x, 25 + dx, x, 25 - dx);
		p5.line(x, 75 + dy, x, 75 - dy);
	}

	// General mouse velocity
	function velocity(p5: Sketch['p5']) {
		let distance = p5.dist(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
		p5.line(x, p5.height / 2 + distance, x, p5.height / 2 - distance);
	}

	let sketch: Sketch = (p5) => {
		p5.setup = () => {
			p5.createCanvas(400, 400);
		};

		p5.draw = () => {
			p5.noStroke();
			p5.fill(255, 10);
			p5.rect(0, 0, p5.width, p5.height);
			p5.stroke('red');
			x = (x + 1) % p5.width;
			// 0 ? velocity(p5) : velocityXY(p5);
			0;
			// p5.ellipse(p5.width / 2, p5.height / 2, width, height);
		};
	};
</script>

<label>
	Width
	<input type="range" bind:value={width} min="100" max="1000" step="0.01" />
	{width}
</label>

<label>
	Height
	<input type="range" bind:value={height} min="100" max="1000" step="0.01" />
	{height}
</label>

<P5 {sketch} />
