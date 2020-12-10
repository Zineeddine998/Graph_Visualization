import node from '../Types/Node';

const createNode = (value: number, x: number, y: number, clientX: number, clientY: number): node => {
	const newNode: node = {
		value: value,
		x: x,
		y: y,
		windowX: clientX,
		windowY: clientY
	};

	return newNode;
};

export default createNode;
