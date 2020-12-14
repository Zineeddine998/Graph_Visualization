import node from '../Types/Node';

const drawEdge = (source: node, target: node, context: CanvasRenderingContext2D): void => {
	const sourceX = source.canvasX;
	const sourceY = source.canvasY;
	const targetX = target.canvasX;
	const targetY = target.canvasY;
	context.lineWidth = 3;
	context.beginPath();
	context.moveTo(sourceX, sourceY);
	context.lineTo(targetX, targetY);
	context.stroke();
};

export default drawEdge;
