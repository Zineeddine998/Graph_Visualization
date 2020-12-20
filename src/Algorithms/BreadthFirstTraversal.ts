import adjacencyListObject from '../Types/adjacencyListObject';

const BreadthFirstTraversal = (adjacencyList: adjacencyListObject[]): number[] => {
	let result: number[] = [];
	if (adjacencyList.length > 0) {
		let visited: Set<number> = new Set<number>();
		let queue: number[] = [];
		visited.add(adjacencyList[0].value);
		queue.push(adjacencyList[0].value);
		while (queue.length > 0) {
			let temp: number = queue[0];
			queue.shift();
			result.push(temp);
			for (let item of adjacencyList) {
				if (item.value === temp) {
					for (let iter of item.target) {
						if (!visited.has(iter)) {
							visited.add(iter);
							queue.push(iter);
						}
					}
				}
			}
		}
	}

	return result;
};

export default BreadthFirstTraversal;
