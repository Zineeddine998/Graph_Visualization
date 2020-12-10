const drawNode = (nodeCount: number, context: CanvasRenderingContext2D, x: number, y: number): void => {
	context.beginPath();
	context.arc(x, y, 20, 0, 2 * Math.PI, false);
	context.lineWidth = 3;
	context.fillStyle = 'grey';
	context.fill();
	context.font = '20px Hack';
	context.fillStyle = '#000000';
	context.textAlign = 'center';
	context.textBaseline = 'middle';
	context.fillText(nodeCount.toString(), x, y);
};

export default drawNode;
