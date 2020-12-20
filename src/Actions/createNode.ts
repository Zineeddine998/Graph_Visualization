import node from '../Types/Node';

const createNode = (
	value: number,
	canvasX: number,
	canvasY: number,
	clientX: number,
	clientY: number,
	windowX: number,
	windowY: number,
	color: string
): node => {
	const newNode: node = {
		value: value,
		canvasX: canvasX,
		canvasY: canvasY,
		clientX: clientX,
		clientY: clientY,
		windowX: windowX,
		windowY: windowY,
		color: color,
		visualize: false
	};
	return newNode;
};

export default createNode;
