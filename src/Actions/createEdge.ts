import node from '../Types/Node';
import edge from '../Types/Edge';

const createEdge = (firstNode: node, secondNode: node) => {
	const newEdge: edge = {
		source: firstNode,
		target: secondNode
	};
	return newEdge;
};

export default createEdge;
