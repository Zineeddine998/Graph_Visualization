import adjacencyListObject from '../Types/adjacencyListObject';

const depthFirstSearchUtil = (
	adjacencyList: adjacencyListObject[],
	result: number[],
	visited: Set<number>,
	value: number
) => {
	visited.add(value);
	result.push(value);
	for (let item of adjacencyList) {
		if (item.value === value) {
			for (let elem of item.target) {
				if (!visited.has(elem)) {
					depthFirstSearchUtil(adjacencyList, result, visited, elem);
				}
			}
		}
	}
};

const depthFirstSearch = (adjacencyList: adjacencyListObject[]): number[] => {
	let result: number[] = [];
	let visited: Set<number> = new Set<number>();
	depthFirstSearchUtil(adjacencyList, result, visited, adjacencyList[0].value);
	console.log(result);
	return result;
};

export default depthFirstSearch;
