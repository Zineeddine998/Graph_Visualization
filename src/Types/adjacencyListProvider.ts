import node from './Node';
import edge from './Edge';
import adjacencyListObject from './adjacencyListObject';

interface adjacencyListProvider {
	nodeList: node[];
	addNode: (node: node) => void;
	edgeList: edge[];
	adjacencyList: adjacencyListObject[];
	addEdge: (edge: edge) => void;
	moveNode: (index: node) => void;
	clearNodes: () => void;
	deleteNode: (x: number, y: number) => void;
}
export default adjacencyListProvider;
