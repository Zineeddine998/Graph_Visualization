const drawNode = (nodeCount: number, context: CanvasRenderingContext2D, x: number, y: number, color: string): void => {
	context.beginPath();
	context.arc(x, y, 20, 0, 2 * Math.PI, false);
	context.lineWidth = 2;
	context.fillStyle = color;
	context.closePath();
	context.fill();
	context.strokeStyle = '#121212';
	context.fillStyle = '#121212';
	context.arc(x, y, 20, 0, 2 * Math.PI, false);
	context.stroke();
	context.font = '20px Roboto';
	context.textAlign = 'center';
	context.textBaseline = 'middle';
	context.fillText(nodeCount.toString(), x, y);
};

export default drawNode;
