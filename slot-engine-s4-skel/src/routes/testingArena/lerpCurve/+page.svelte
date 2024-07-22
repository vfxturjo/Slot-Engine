<script lang="ts">
	import type P5 from 'p5';
	import * as knobby from '@thenbe/svelte-knobby';

	import { onMount } from 'svelte';
	import { clamp } from '$lib/_tj_world/utils';

	// sketch related variables
	let sketchP5: P5;
	let anchorTag: HTMLElement;
	let pointPos: P5.Vector;
	let pointVelocity: P5.Vector;
	let pointAcceleration: P5.Vector;

	// things in sketch
	// sketch setup and draw function
	const sketch1 = (p5: P5) => {
		p5.setup = () => {
			// Your setup function
			p5.createCanvas(800, 500);
			p5.noStroke();
			p5.frameRate(40);

			pointPos = p5.createVector(0, $opts.basic.startY);
			pointVelocity = p5.createVector(0, 0);
			pointAcceleration = p5.createVector(0, 0);
		};

		p5.draw = () => {
			if (!p5.mouseIsPressed) {
				return;
			}
			p5.background(0);

			// drawing reference line
			drawReferenceLine();

			p5.strokeWeight(5);

			// point pos calulation
			pointPos.set(0, $opts.basic.startY);
			pointVelocity.set(0, 0);
			pointAcceleration.set(0, 0);

			// doing magic
			const compensation = 0.25 - 0.14 * Math.log($opts.velocityDamping);
			console.log(compensation);

			for (pointPos.x = 0; pointPos.x < p5.width; pointPos.x++) {
				if (pointPos.x > $opts.basic.transitionTime) {
					const force = p5.createVector(0, 0);

					force.y = $opts.basic.endY - pointPos.y; // force

					// pointAcceleration.add(force.mult($opts.frequency)); // acceleration (f=ma => a)
					// pointAcceleration.mult($opts.timeScale); // acceleration damping  // TODO ADDING compensation

					// pointVelocity.add(pointAcceleration);
					// pointVelocity.add(force.mult(compensation * $opts.frequency));
					pointVelocity.add(force.mult($opts.frequency));
					pointVelocity.mult($opts.velocityDamping);

					pointPos.add(pointVelocity);
				}

				// drawing point
				p5.stroke(clamp(Math.abs(pointVelocity.y) * 50, 50, 255));

				p5.point(pointPos.x, pointPos.y);
			}
		};

		function drawReferenceLine() {
			p5.stroke('orange');
			p5.strokeWeight(1);
			p5.line(0, $opts.basic.startY, $opts.basic.transitionTime, $opts.basic.startY);
			p5.line(
				$opts.basic.transitionTime,
				$opts.basic.startY,
				$opts.basic.transitionTime,
				$opts.basic.endY
			);
			p5.line($opts.basic.transitionTime, $opts.basic.endY, p5.width, $opts.basic.endY);
		}
	};

	// sketch event handlers
	function addEventHandlers() {
		sketchP5.mouseClicked = (e: MouseEvent) => {
			// console.log(e);
		};
	}

	///////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////

	// loading the sketch
	onMount(async () => {
		let p5 = (await import('p5')).default;
		sketchP5 = new p5(sketch1, anchorTag);
		addEventHandlers();
	});
	// knobby things
	const opts = knobby.panel({
		basic: {
			startY: { value: 400, min: 0, max: 500, step: 1 },
			endY: { value: 200, min: 0, max: 500, step: 1 },
			transitionTime: { value: 100, min: 0, max: 1000, step: 1 }
		},

		frequency: { value: 1, min: 0.0001, max: 1, step: 0.001 }, // mass div
		// frequency: { value: 1, min: 0.5, max: 1.5, step: 0.001 }, // mass div
		velocityDamping: { value: 0.1, min: 0, max: 1, step: 0.001 },

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

		for (let velocityDamping = 0.01; velocityDamping < 1; velocityDamping += 0.01) {
			// for each velocity damping  value

			for (let frequency = 0.01; frequency < 1; frequency += 0.001) {
				// for each velocity frequency value
				pointPos.set(0, $opts.basic.startY);
				pointVelocity.set(0, 0);
				pointAcceleration.set(0, 0);

				let doneInside = false;

				for (pointPos.x = 0; pointPos.x < 10000; pointPos.x++) {
					if (pointPos.x > $opts.basic.transitionTime) {
						const force = sketchP5.createVector(0, 0);

						force.y = $opts.basic.endY - pointPos.y; // force

						// pointVelocity.add(pointAcceleration);
						pointVelocity.add(force.mult(frequency));
						pointVelocity.mult(velocityDamping);

						pointPos.add(pointVelocity);

						sketchP5.stroke(20, 20, 20, 100);
						sketchP5.point(pointPos.x, pointPos.y);

						if (pointPos.y < $opts.basic.endY) {
							console.log(pointPos.x, pointPos.y, $opts.basic.endY + 10);

							answers.push([velocityDamping, frequency]);
							sketchP5.stroke('orange');
							sketchP5.point(pointPos.x, pointPos.y);
							sketchP5.noLoop();

							doneInside = true;

							break;
						}
					}
				}

				if (doneInside) {
					break;
				}
				console.log('reached');
			}
		}

		console.log(JSON.stringify(answers));
	}
</script>

<div class="bg-gray-600" bind:this={anchorTag}></div>
