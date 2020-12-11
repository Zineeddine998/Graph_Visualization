import node from '../Types/Node';

const contextMenuState = (nodeList: node[], x: number, y: number): boolean => {
	let result: boolean = true;
	for (let item of nodeList) {
		console.log(`Pos: ${x} ${y}, Item: ${item.windowX} ${item.windowY}`);
		if (Math.abs(item.clientX - x) < 20 && Math.abs(item.clientY - y) < 20) {
			result = false;
		}
	}

	return result;
};

export default contextMenuState;
