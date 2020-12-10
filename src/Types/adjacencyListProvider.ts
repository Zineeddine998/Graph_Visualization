import node from './Node';

interface adjacencyListProvider {
	adjacencyList: node[];
	addNode: (node: node) => void;
}
export default adjacencyListProvider;
