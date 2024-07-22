import type P5 from 'p5';
import { physicalObject } from './physicalObject';

export class box extends physicalObject {
	width = 10;
	height = 10;
	color = 0;

	/**
	 * More information are to be added here.
	 **/

	constructor(
		p5: P5,
		posX: number,
		posY: number,
		width: number = 10,
		height: number = width,
		color: number = 0
	) {
		super(p5);

		this.width = width;
		this.height = height;
		this.color = color;

		this.position = this.p.createVector(posX, posY);
	}

	show() {
		this.p.push();
		this.p.fill(this.color, this.color, this.color);
		this.p.rect(this.position.x, this.position.y, this.width, this.height);
		this.p.pop();
	}
}
