import breadthFirstTraversal from '../Algorithms/BreadthFirstTraversal';
import depthFirstTraversal from '../Algorithms/DepthFirstTraversal';
import topologicalSort from '../Algorithms/TopologicalSort';
import cycleDetection from '../Algorithms/CycleDetection';
import createNode from '../Actions/createNode';

const firstAdjacencyList = [];
const firstNodeList = [];

const secondAdjacencyList = [ { value: 0, target: [] } ];
const secondNodeList = [ createNode(0, 100, 100, 100, 100, 500, 500, '') ];

const thirdAdjacencyList = [
	{ count: 0, target: [ 1 ] },
	{ count: 1, target: [ 2 ] },
	{ count: 2, target: [ 3 ] },
	{ count: 3, target: [ 0 ] }
];

test('Breadth First Traversal Works', () => {
	const firstResult = breadthFirstTraversal(firstAdjacencyList);
	expect(firstResult).toEqual([]);
	const secondResult = breadthFirstTraversal(secondAdjacencyList);
	expect(secondResult).toEqual([ 0 ]);
});

test('Depth First Traversal Works', () => {
	const firstResult = depthFirstTraversal(firstAdjacencyList);
	expect(firstResult).toEqual([]);
	const secondResult = depthFirstTraversal(secondAdjacencyList);
	expect(secondResult).toEqual([ 0 ]);
});

test('Topological Sort Works', () => {
	const firstResult = topologicalSort(firstAdjacencyList, firstNodeList);
	expect(firstResult).toEqual([]);
	const secondResult = topologicalSort(secondAdjacencyList, secondNodeList);
	expect(secondResult).toEqual([ 0 ]);
});

test('Cycle Detection Works', () => {
	const expectedResultOne = {
		errorDetected : false,
		result        : []
	};
	const expectedResultTwo = {
		errorDetected : false,
		result        : [ 0 ]
	};

	const expectedResultThree = {
		errorDetected : true,
		result        : [ 0 ]
	};
	const firstResult = cycleDetection(firstAdjacencyList);
	expect(firstResult).toEqual(expectedResultOne);
	const secondResult = cycleDetection(secondAdjacencyList);
	expect(secondResult).toEqual(expectedResultTwo);
	const thirdResult = cycleDetection(thirdAdjacencyList);
	expect(thirdResult.errorDetected).toEqual(expectedResultThree.errorDetected);
});
