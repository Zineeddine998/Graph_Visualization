import node from './Node';

interface Edge {
	directed: boolean;
	source: node;
	target: node;
	weight: number;
}

export default Edge;
