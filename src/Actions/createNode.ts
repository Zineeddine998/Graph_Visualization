import node from '../Types/Node';

const createNode = (
	value: number,
	canvasX: number,
	canvasY: number,
	clientX: number,
	clientY: number,
	windowX: number,
	windowY: number
): node => {
	const newNode: node = {
		value: value,
		canvasX: canvasX,
		canvasY: canvasY,
		clientX: clientX,
		clientY: clientY,
		windowX: windowX,
		windowY: windowY
	};

	return newNode;
};

export default createNode;
