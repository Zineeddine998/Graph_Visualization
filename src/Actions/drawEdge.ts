import node from '../Types/Node';

const drawEdge = (nodeList: node[], source: number, target: number, context: CanvasRenderingContext2D): void => {
	for (let item in nodeList) {
		if (nodeList[item].value === source) {
			source = +item;
		}
		else if (nodeList[item].value === target) {
			target = +item;
		}
	}
	const sourceX = nodeList[source].canvasX;
	const sourceY = nodeList[source].canvasY;
	const targetX = nodeList[target].canvasX;
	const targetY = nodeList[target].canvasY;
	context.lineWidth = 3;
	context.beginPath();
	context.moveTo(sourceX, sourceY);
	context.lineTo(targetX, targetY);
	context.stroke();
};

export default drawEdge;
