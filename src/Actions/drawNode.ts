const drawNode = (
	nodeCount: number,
	context: CanvasRenderingContext2D,
	x: number,
	y: number,
	color: string,
	fontColor: string
): void => {
	context.beginPath();
	context.arc(x, y, 20, 0, 2 * Math.PI, false);
	context.lineWidth = 2;
	context.fillStyle = color;
	context.closePath();
	context.fill();
	context.strokeStyle = fontColor;
	context.fillStyle = "black";
	context.arc(x, y, 20, 0, 2 * Math.PI, false);
	context.stroke();
	context.font = '20px Roboto';
	context.textAlign = 'center';
	context.textBaseline = 'middle';
	context.fillText(nodeCount.toString(), x, y);
};

export default drawNode;
