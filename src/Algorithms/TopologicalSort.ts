const dfs = (
	adjacencyList: number[][],
	index: number,
	visited: Set<number>,
	visitedT: Set<number>,
	result: number[]
): boolean => {
	visited.add(index);
	visitedT.add(index);
	if (adjacencyList[index].length === 0) visitedT.clear();
	for (let item of adjacencyList) {
		if (visitedT.has(+item) === true) {
			return false;
		}
		if (visited.has(+item) === false) {
			let value: boolean = dfs(adjacencyList, +item, visited, visitedT, result);
			if (value === false) return false;
		}
	}
	result.push(index);
	return true;
};

const topologicalSort = (adjacencyList: number[][]): number[] => {
	let result: number[] = [];
	let visited = new Set<number>();
	for (let item in adjacencyList) {
		let visitedT = new Set<number>();
		if (visited.has(+item) === false) {
			let value: boolean = dfs(adjacencyList, +item, visited, visitedT, result);
			if (value === false) {
				result = [];
				return result;
			}
		}
	}
	return result;
};

export default topologicalSort;
