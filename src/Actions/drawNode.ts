const drawNode = (nodeCount: number, context: CanvasRenderingContext2D, x: number, y: number, color: string): void => {
	context.beginPath();
	context.arc(x, y, 25, 0, 2 * Math.PI, false);
	context.stroke();
	context.lineWidth = 6;
	context.fillStyle = 'black';
	context.fill();
	context.font = '25px Hack';
	context.fillStyle = color;
	context.textAlign = 'center';
	context.textBaseline = 'middle';
	context.fillText(nodeCount.toString(), x, y);
};

export default drawNode;
