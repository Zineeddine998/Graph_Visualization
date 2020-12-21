import node from '../Types/Node';

function drawArrowHead (
	context: CanvasRenderingContext2D,
	from: [number, number],
	to: [number, number],
	radius: number,
	color: string
){
	let [ x_center, y_center ] = to;
	let [ fromX, fromY ] = from;

	let angle;
	let x, y;
	context.fillStyle = color;
	angle = Math.atan2(y_center - fromY, x_center - fromX);
	x = x_center;
	y = y_center;

	context.moveTo(x, y);

	angle += 1.0 / 3.0 * (2 * Math.PI);
	x = 0.8 * radius * Math.cos(angle) + x_center;
	y = 0.8 * radius * Math.sin(angle) + y_center;

	context.lineTo(x, y);
	angle += 1.0 / 3.0 * (2 * Math.PI);
	x = 0.8 * radius * Math.cos(angle) + x_center;
	y = 0.8 * radius * Math.sin(angle) + y_center;
	context.lineTo(x, y);

	context.closePath();
	context.fill();
}

const drawEdge = (
	source: node,
	target: node,
	directed: boolean,
	context: CanvasRenderingContext2D,
	color: string
): void => {
	let sourceX = source.canvasX;
	let sourceY = source.canvasY;
	let targetX = target.canvasX;
	let targetY = target.canvasY;
	const theta = Math.atan2(targetY - sourceY, targetX - sourceX);
	targetX = targetX - 20 * Math.cos(theta);
	targetY = targetY - 20 * Math.sin(theta);
	sourceX = sourceX + 20 * Math.cos(theta);
	sourceY = sourceY + 20 * Math.sin(theta);
	context.lineWidth = 3;
	context.strokeStyle = color;
	context.fillStyle = color;
	context.beginPath();
	context.moveTo(sourceX, sourceY);
	context.lineTo(targetX, targetY);
	context.stroke();
	if (directed) {
		drawArrowHead(context, [ sourceX, sourceY ], [ targetX, targetY ], 15, color);
	}
};

export default drawEdge;
