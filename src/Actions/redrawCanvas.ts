import node from '../Types/Node';
import edge from '../Types/Edge';
import drawNode from './drawNode';
import drawEdge from './drawEdge';

const redrawCanvas = (
	nodeList: node[],
	edgeList: edge[],
	canvas: HTMLCanvasElement | null,
	context: CanvasRenderingContext2D | null,
	edgeColor: string
) => {
	if (canvas && context) {
		context.clearRect(0, 0, canvas.width, canvas.height);
		const rect = canvas.getBoundingClientRect();
		for (let item of nodeList) {
			if (rect.right !== item.windowX || rect.bottom !== item.windowY) {
				item.clientX = item.clientX * (rect.right / item.windowX);
				item.clientY = item.clientY * (rect.bottom / item.windowY);
				item.canvasX = item.clientX - rect.left;
				item.canvasY = item.clientY - rect.top;
				item.windowX = rect.right;
				item.windowY = rect.bottom;
			}
		}
		for (let item of edgeList) {
			drawEdge(item.source, item.target, item.directed, context, edgeColor);
		}
		for (let item of nodeList) {
			drawNode(item.value, context, item.canvasX, item.canvasY, '#fff233');
		}
	}
};

export default redrawCanvas;
