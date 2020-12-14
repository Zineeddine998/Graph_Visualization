import node from './Node';

interface Edge {
	source: node;
	target: node;
	directed: boolean;
}

export default Edge;
