import Matter from 'matter-js';

export function createStaticGroundBottom(engine: Matter.Engine, width: number, height: number) {
	// Create a ground
	const ground = Matter.Bodies.rectangle(width / 2, height - 10, width, 20, {
		isStatic: true,
		render: {
			fillStyle: '#2e2b44'
		}
	});

	// Add ground to the world
	Matter.Composite.add(engine.world, ground);
	return ground;
}
