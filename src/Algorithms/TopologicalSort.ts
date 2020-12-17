import adjacencyListObject from '../Types/adjacencyListObject';
import node from '../Types/Node';
const getIndex = (adjacencyList: adjacencyListObject[], count: number) => {
	for (let item in adjacencyList) {
		if (adjacencyList[+item].value - count === 0) {
			return +item;
		}
	}
	return -1;
};

const dfs = (
	adjacencyList: adjacencyListObject[],
	nodeList: node[],
	count: number,
	visited: Set<number>,
	visited2: Set<number>,
	result: number[]
): boolean => {
	const index = getIndex(adjacencyList, count);
	visited.add(count);
	visited2.add(count);
	if (adjacencyList[index].target.length === 0) {
		visited2.clear();
	}
	for (let item of adjacencyList[index].target) {
		if (visited2.has(item) === true) {
			return false;
		}
		if (visited.has(item) === false) {
			let value: boolean = dfs(adjacencyList, nodeList, item, visited, visited2, result);
			if (value === false) {
				return false;
			}
		}
	}
	result.push(count);
	return true;
};

const topologicalSort = (adjacencyList: adjacencyListObject[], nodeList: node[]): number[] => {
	let result: number[] = [];
	let visited = new Set<number>();
	for (let elem in adjacencyList) {
		const item = adjacencyList[+elem];
		let visited2 = new Set<number>();
		if (visited.has(item.value) === false) {
			let value: boolean = dfs(adjacencyList, nodeList, item.value, visited, visited2, result);
			if (value === false) {
				result = [];
				return result;
			}
		}
	}
	return result;
};

export default topologicalSort;
