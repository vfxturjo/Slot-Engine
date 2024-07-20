<script lang="ts">
	import type P5 from 'p5';
	import * as knobby from '@thenbe/svelte-knobby';

	import { onMount } from 'svelte';
	import { linearSpace } from '$lib/_tj_world/constraints/linearSpace';
	import { newbox } from '$lib/_tj_world/objects/box';
	import { mouseAttractor } from '$lib/_tj_world/constraints/mouseAttract';

	// sketch related variables
	let sketchP5: P5;
	let anchorTag: HTMLElement;

	// things in sketch
	// constraints
	let space1: linearSpace;
	let mouseAttractor1: mouseAttractor;

	// onjects
	let box1: newbox;
	let box2: newbox;

	// sketch setup and draw function
	const sketch1 = (p5: P5) => {
		p5.setup = () => {
			// Your setup function
			p5.createCanvas(1000, 500);
			p5.noStroke();
		};

		p5.draw = () => {
			p5.background(0);
			space1.show($opts.yLineLoc);
			box1.follow(p5.mouseX, p5.mouseY);
			box1.show();
		};
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

		space1 = new linearSpace(sketchP5);
		space1.addXlock(10, 200);

		mouseAttractor1 = new mouseAttractor(sketchP5);

		box1 = new newbox(sketchP5, 0, 0, 10);
		box1.color = 255;

		box1.addLinearSpaceConstraint(space1);

		box2 = new newbox(sketchP5, 0, 0, 10);
		box2.color = 255;

		// console.log(sketchP5);
	});

	// knobby things
	const opts = knobby.panel({
		yLineLoc: { value: 0.5, min: 0, max: 1, step: 0.01 },
		min: { value: 10, min: 0, max: 1000, step: 1 },
		max: { value: 10, min: 0, max: 1000, step: 1 },
		updateRange: () => {
			space1.xLock.min = $opts.min;
			space1.xLock.max = $opts.max;
		},
		height: { value: 55, min: 100, max: 1000 },
		speed: { value: 1, min: 0.01, max: 10, step: 0.1 },
		color: '#ff3e00',

		toggleUpdate: () => {
			sketchP5.isLooping() ? sketchP5.noLoop() : sketchP5.loop();
		},
		addYconstraint: () => {},
		logObjects: () => {
			space1.logObjects();
		}
	});

	console.log($opts.width);
</script>

<!-- <input type="range" min="0" max="255" bind:value={opacity} /> -->
<div class="bg-black" bind:this={anchorTag}></div>
