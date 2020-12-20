import adjacencyListObject from '../Types/adjacencyListObject';
import visualizeObject from '../Types/visualizeObject';

const CycleDetectionUtils = (
	adjacencyList: adjacencyListObject[],
	value: number,
	visited: Set<number>,
	recStack: Set<number>,
	result: number[]
): boolean => {
	if (visited.has(value) === false) {
		visited.add(value);
		recStack.add(value);
		result.push(value);
		for (let item of adjacencyList) {
			for (let elem of item.target) {
				if (!visited.has(value) && CycleDetectionUtils(adjacencyList, elem, visited, recStack, result)) {
					return true;
				}
				else if (recStack.has(elem)) return true;
			}
		}
	}
	recStack.delete(value);
	return false;
};

const CycleDetection = (adjacencyList: adjacencyListObject[]): visualizeObject => {
	let result: number[] = [];
	let visited: Set<number> = new Set<number>();
	let recStack: Set<number> = new Set<number>();
	for (let item of adjacencyList) {
		if (CycleDetectionUtils(adjacencyList, item.value, visited, recStack, result)) {
			return { errorDetected: true, result };
		}
	}
	return { errorDetected: false, result };
};

export default CycleDetection;
