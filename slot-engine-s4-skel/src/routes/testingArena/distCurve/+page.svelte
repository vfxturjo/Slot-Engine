<script lang="ts">
	import type P5 from 'p5';
	import * as knobby from '@thenbe/svelte-knobby';

	import { onMount } from 'svelte';
	import { clamp, mapRange, clampToMinZero } from '$lib/_tj_world/utils';

	// sketch related variables
	let sketchP5: P5;
	let anchorTag: HTMLElement;
	let pointPos: P5.Vector;
	let pointForce: P5.Vector;

	// things in sketch
	// sketch setup and draw function
	const sketch1 = (p5: P5) => {
		p5.setup = () => {
			// Your setup function
			p5.createCanvas(800, 500);
			p5.frameRate(30);

			pointForce = p5.createVector(0, 0);
		};

		p5.draw = () => {
			if (!p5.mouseIsPressed) {
				return;
			}
			p5.background(0);

			// drawing reference line
			drawReferenceLine();

			p5.strokeWeight(5);

			// calculating the things
			for (let x = 0; x < p5.width; x += 5) {
				const y = x * $opts.slope + $opts.refLineHeight;
				const pointPos = p5.createVector(x, y);
				const attractedTo = p5.createVector(x, $opts.refLineHeight);
				const distanceP5 = attractedTo.sub(pointPos);
				// distanceP5.setMag(1000 / Math.pow(distanceP5.mag(), $opts.pow));

				distanceP5.setMag(
					mapRange(
						// clamping to min zero
						clampToMinZero(
							// fixed distance
							$opts.forceRadius - distanceP5.mag()
						) **
							// applying power
							$opts.pow,
						0,
						$opts.maxForce,
						0,
						// calculating for 2
						($opts.forceRadius - 2) ** $opts.pow
					)
				);

				p5.push();
				p5.stroke('orange');
				p5.strokeWeight(3);
				p5.translate(pointPos.x, pointPos.y);
				p5.point(0, 0);

				p5.stroke('red');
				p5.strokeWeight(1);
				p5.line(0, 0, distanceP5.x, distanceP5.y);

				// drawing the texts
				p5.noStroke();
				p5.fill('white');
				if (pointPos.x % $opts.textSpacing == 0) {
					p5.text(distanceP5.mag().toFixed(3), 0, 50);
				}
				p5.pop();
			}
		};

		function drawReferenceLine() {
			p5.push();
			p5.stroke('orange');
			p5.strokeWeight(1);
			p5.line(0, $opts.refLineHeight, p5.width, $opts.refLineHeight);
			p5.pop();
		}
	};

	///////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////

	// loading the sketch
	onMount(async () => {
		let p5 = (await import('p5')).default;
		sketchP5 = new p5(sketch1, anchorTag);
	});
	// knobby things
	const opts = knobby.panel({
		slope: { value: 0.7, min: 0.1, max: 2, step: 0.001 }, // mass div
		refLineHeight: { value: 150, min: 1, max: 400, step: 1 }, // mass div
		textSpacing: { value: 20, min: 10, max: 50, step: 5 }, // mass div
		forceRadius: { value: 250, min: 10, max: 500, step: 1 }, // mass div
		pow: { value: 1, min: 0.2, max: 5, step: 0.01 }, // mass div
		maxForce: { value: 100, min: 10, max: 1000, step: 0.01 }, // mass div

		color: '#ff3e00',
		calculate: () => {
			doCalc();
		},
		toggleUpdate: () => {
			sketchP5.isLooping() ? sketchP5.noLoop() : sketchP5.loop();
		}
	});

	// console.log($opts.width);
	function doCalc() {
		const answers: [string[], number[]?] = [['velocityDamping', 'frequency']];
		// point pos calulation

		// doing magic

		console.log(JSON.stringify(answers));
	}
</script>

<div class="bg-gray-600" bind:this={anchorTag}></div>
