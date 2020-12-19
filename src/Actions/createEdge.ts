import node from '../Types/Node';
import edge from '../Types/Edge';

const createEdge = (firstNode: node, secondNode: node, directed: boolean, weight: number = 0): edge => {
	const newEdge: edge = {
		source: firstNode,
		target: secondNode,
		directed: directed,
		weight: weight
	};
	return newEdge;
};

export default createEdge;
