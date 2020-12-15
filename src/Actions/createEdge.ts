import node from '../Types/Node';
import edge from '../Types/Edge';

const createEdge = (firstNode: node, secondNode: node, directed: boolean) => {
	const newEdge: edge = {
		source: firstNode,
		target: secondNode,
		directed: directed
	};
	return newEdge;
};

export default createEdge;
