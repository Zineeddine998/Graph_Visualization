const drawNode = (nodeCount: number, context: CanvasRenderingContext2D, x: number, y: number, color: string): void => {
	context.beginPath();
	context.arc(x, y, 25, 0, 2 * Math.PI, false);
	context.lineWidth = 3;
	context.fillStyle = color;
	context.fill();
	context.fillStyle = '#000000';
	context.arc(x, y, 25, 0, 2 * Math.PI, false);
	context.stroke();
	context.font = '25px Hack';
	context.textAlign = 'center';
	context.textBaseline = 'middle';
	context.fillText(nodeCount.toString(), x, y);
};

export default drawNode;
