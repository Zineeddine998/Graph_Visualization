import node from '../Types/Node';
import edge from '../Types/Edge';
import drawEdge from './drawEdge';
import drawNode from './drawNode';
import edgeColor from './edgeColor';
import redrawCanvas from './redrawCanvas';

const slowDrawNode = async (
	nodeList: node[],
	resultList: node[],
	edgeList: edge[],
	canvas: HTMLCanvasElement,
	context: CanvasRenderingContext2D,
	res: (value: boolean) => any
) => {
	let promises = [];
	for (let item of resultList) {
		promises.push(
			new Promise((res, rej) => {
				setTimeout(() => {
					item.visualize = true;
					redrawCanvas(nodeList, edgeList, canvas, context, edgeColor(document));
					res(true);
				}, 1000 * resultList.findIndex((node) => node.value === item.value));
			})
		);
	}
	Promise.all(promises).then(() => {
		for (let item of resultList) {
			item.visualize = false;
		}
		res(true);
	});
};

const visualize = (
	nodeList: node[],
	resultList: node[],
	edgeList: edge[],
	canvas: HTMLCanvasElement | null,
	context: CanvasRenderingContext2D | null
): Promise<boolean> => {
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
		redrawCanvas(nodeList, edgeList, canvas, context, edgeColor(document));
		return new Promise<boolean>((res) => slowDrawNode(nodeList, resultList, edgeList, canvas, context, res));
	}
	return new Promise<boolean>((res, rej) => {
		rej(0);
	});
};

export default visualize;
