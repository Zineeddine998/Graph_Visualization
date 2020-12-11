import node from './Node';
import edge from './Edge';

interface adjacencyListProvider {
	nodeList: node[];
	addNode: (node: node) => void;
	edgeList: edge[];
	addEdge: (edge: edge) => void;
	clearNodes: () => void;
}
export default adjacencyListProvider;
