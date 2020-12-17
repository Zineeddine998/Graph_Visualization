import node from './Node';
import edge from './Edge';
import adjacencyListObject from './adjacencyListObject';

interface adjacencyListProvider {
	nodeList: node[];
	edgeList: edge[];
	adjacencyList: adjacencyListObject[];
	addNode: (node: node) => void;
	addEdge: (edge: edge) => void;
	moveNode: (index: node) => void;
	deleteNode: (x: number, y: number) => void;
	clearNodes: () => void;
}
export default adjacencyListProvider;
