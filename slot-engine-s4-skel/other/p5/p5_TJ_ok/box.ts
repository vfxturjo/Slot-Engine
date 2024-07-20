import type P5 from 'p5';

export class box_p5 {
	p: P5;
	width = 10;
	height = 10;
	color = 0;

	// force = this.p.createVector (0,0);
	position: P5.Vector;
	force: P5.Vector;
	velocity: P5.Vector;
	forceMultiplier = 0.1;

	constructor(
		p5: P5,
		posX: number,
		posY: number,
		width: number = 10,
		height: number = 10,
		color: number = 0
	) {
		this.p = p5;

		this.width = width;
		this.height = height;
		this.color = color;

		this.position = this.p.createVector(posX, posY);
		this.force = this.p.createVector(0, 0);
		this.velocity = this.p.createVector(0, 0);
	}

	show() {
		this.p.push();
		this.p.fill(this.color, this.color, this.color);
		this.p.rect(this.position.x, this.position.y, this.width, this.height);
		this.p.pop();
	}

	follow(x: number, y: number) {
		this.force.x = x - this.position.x;
		this.force.y = y - this.position.y;

		this.velocity = this.force.mult(this.forceMultiplier);
		this.position.add(this.velocity);
	}
}
