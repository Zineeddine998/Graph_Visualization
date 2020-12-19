import node from '../Types/Node';

const edgeColor = (document: Document): string => {
	let theme = document.documentElement.getAttribute('data-theme');
	let edgeColor = '#333333';
	if (theme === 'dark') {
		edgeColor = '#eeeeee';
	}
	return edgeColor;
};

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
