import node from '../Types/Node';
import edge from '../Types/Edge';
import drawNode from './drawNode';
import drawEdge from './drawEdge';

const redrawCanvas = (
	nodeList: node[],
	edgeList: edge[],
	canvas: HTMLCanvasElement | null,
	context: CanvasRenderingContext2D | null
) => {
	if (canvas && context) {
		context.clearRect(0, 0, canvas.width, canvas.height);
		for (let item of edgeList) {
			drawEdge(nodeList, item.source.value, item.target.value, context);
		}
		for (let item of nodeList) {
			drawNode(item.value, context, item.canvasX, item.canvasY);
		}
	}
};

export default redrawCanvas;
