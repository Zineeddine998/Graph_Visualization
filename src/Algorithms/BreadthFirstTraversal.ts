import adjacencyListObject from '../Types/adjacencyListObject';

const BreadthFirstTraversal = (adjacencyList: adjacencyListObject[]): number[] => {
	let result: number[] = [];
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
				for (let elem of item.target) {
					if (!visited.has(elem)) {
						visited.add(elem);
						queue.push(elem);
					}
				}
			}
		}
	}

	return result;
};

export default BreadthFirstTraversal;
