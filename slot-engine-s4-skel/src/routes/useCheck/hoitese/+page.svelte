<script lang="ts">
	import P5, { type Sketch } from 'p5-svelte';
	import * as knobby from '@thenbe/svelte-knobby';

	let clean_canvas_out: Function;

	const opts = knobby.panel({
		width: { value: 55, min: 100, max: 1000 },
		height: { value: 55, min: 100, max: 1000 },
		speed: { value: 1, min: 0.01, max: 10, step: 0.1 },
		color: '#ff3e00',
		updating: true,

		clean: () => {
			console.log('doing');
			clean_canvas_out();
		}
	});

	console.log($opts.width);

	let width = 55;
	let height = 55;
	let x = 0;

	let p5ref = undefined;

	const sketch: Sketch = (p5) => {
		clean_canvas_out = () => {
			p5.clear();
		};
		// function cleanCanvas() {
		// 	p5.clear();
		// }
		// clean_canvas_out = cleanCanvas;

		function velocityXY(p5: P5) {
			let dx = p5.mouseX - p5.pmouseX;
			let dy = p5.mouseY - p5.pmouseY;
			p5.line(x, 25 + dx, x, 25 - dx);
			p5.line(x, 75 + dy, x, 75 - dy);
		}

		let velocity = () => {
			let distance = p5.dist(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
			p5.line(x, p5.height / 2 + distance, x, p5.height / 2 - distance);
		};

		p5.setup = () => {
			p5.createCanvas(400, 400);
		};

		p5.draw = () => {
			p5.noStroke();
			p5.fill(255, 10);
			p5.rect(0, 0, p5.width, p5.height);
			p5.stroke('red');
			x = (x + $opts.speed) % p5.width;
			velocity();
			// 0 ? velocity(p5) : velocityXY(p5);
		};
	};
	console.log(sketch);
</script>

<P5 {sketch} />
