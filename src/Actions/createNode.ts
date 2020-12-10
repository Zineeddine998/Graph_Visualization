import node from '../Types/Node';

const createNode = (value: number, x: number, y: number): node => {
	const newNode: node = {
		value: value,
		x: x,
		y: y,
		windowX: window.innerWidth,
		windowY: window.innerHeight
	};

	return newNode;
};

export default createNode;
