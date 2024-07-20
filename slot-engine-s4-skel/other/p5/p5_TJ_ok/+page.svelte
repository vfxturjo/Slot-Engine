<script lang="ts">
	import type P5 from 'p5';
	import * as knobby from '@thenbe/svelte-knobby';

	import { onMount } from 'svelte';

	import { box_p5 } from './box';
	import { circleGridDesign } from './circleGridDesign';

	// sketch related variables
	let sketchP5: P5;
	let anchorTag: HTMLElement;

	// things in sketch
	let circledesign: circleGridDesign;
	let my_box: box_p5;

	let opacity = 0;

	// sketch setup and draw function
	const sketch1 = (p5: P5) => {
		p5.setup = () => {
			// Your setup function
			p5.createCanvas(710, 500);
			p5.noStroke();

			my_box = new box_p5(p5, p5.width / 2, p5.height / 2);
			circledesign = new circleGridDesign(p5, 0, 0);
		};

		p5.draw = () => {
			p5.background(opacity);
			// Your draw function
			circledesign.show();

			circledesign.follow(p5.mouseX, p5.mouseY);
			// my_box.follow(p5.mouseX, p5.mouseY);
			// my_box.show();
		};
	};

	// sketch event handlers
	function addEventHandlers() {
		sketchP5.mouseClicked = (e: MouseEvent) => {
			console.log(e);
		};
	}

	// loading the sketch
	onMount(async () => {
		let p5 = (await import('p5')).default;
		sketchP5 = new p5(sketch1, anchorTag);
		addEventHandlers();

		// console.log(sketchP5);
	});

	// knobby things
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
</script>

<input type="range" min="0" max="255" bind:value={opacity} />
<div class="bg-black" bind:this={anchorTag}></div>
