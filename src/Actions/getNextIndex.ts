import node from '../Types/Node';

const getNextIndex = (nodeList: node[]) => {
	let index = 0;

	console.log(nodeList.length);
	if (nodeList.length > 0) {
		index = nodeList.slice(-1)[0].value + 1;
	}

	return index;
};

export default getNextIndex;
