import node from './Node';

interface Edge {
	directed: boolean;
	source: node;
	target: node;
}

export default Edge;
