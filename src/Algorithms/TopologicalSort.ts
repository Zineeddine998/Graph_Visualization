import adjacencyListObject from '../Types/adjacencyListObject';
import node from '../Types/Node';
const getIndex = (adjacencyList: adjacencyListObject[], count: number) => {
	for (let item in adjacencyList) {
		console.log(adjacencyList[item].value, count);
		if (adjacencyList[+item].value - count === 0) {
			console.log(adjacencyList[item].value, count);
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
	tempVisited: Set<number>,
	result: number[]
): boolean => {
	const index = getIndex(adjacencyList, count);
	console.log(index);
	console.log(adjacencyList);
	visited.add(count);
	tempVisited.add(count);
	if (adjacencyList[index].target.length === 0) {
		tempVisited.clear();
	}
	for (let item of adjacencyList[index].target) {
		if (tempVisited.has(item) === true) {
			console.log(adjacencyList[index]);
			console.log(tempVisited);
			console.log(item);
			return false;
		}
		if (visited.has(item) === false) {
			console.log(item);
			let value: boolean = dfs(adjacencyList, nodeList, item, visited, tempVisited, result);
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
	for (let iter in adjacencyList) {
		const item = adjacencyList[+iter];
		let tempVisited = new Set<number>();
		if (visited.has(item.value) === false) {
			let value: boolean = dfs(adjacencyList, nodeList, item.value, visited, tempVisited, result);
			if (value === false) {
				result = [];
				return result;
			}
		}
	}
	console.log(result);
	return result;
};

export default topologicalSort;
