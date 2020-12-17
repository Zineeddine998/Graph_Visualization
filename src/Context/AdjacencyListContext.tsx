import React, { createContext, useState, ReactNode } from 'react';
import node from '../Types/Node';
import edge from '../Types/Edge';
import adjacencyListProvider from '../Types/adjacencyListProvider';
import adjacencyListObject from '../Types/adjacencyListObject';

const initialState: adjacencyListProvider = {
	nodeList: [],
	edgeList: [],
	adjacencyList: [],
	addNode: (node: node) => {},
	addEdge: (edge: edge) => {},
	moveNode: (index: node) => {},
	deleteNode: (x: number, y: number) => {},
	clearNodes: () => {}
};

export const AdjacencyListContext = createContext<adjacencyListProvider>(initialState);

type IProps = {
	children: ReactNode;
};

export const AdjacencyListContextProvider = (props: IProps) => {
	const [
		nodeList,
		setNodeList
	] = useState<node[]>([]);
	const [
		edgeList,
		setEdgeList
	] = useState<edge[]>([]);
	const [
		adjacencyList,
		setAdjacencyList
	] = useState<adjacencyListObject[]>([]);

	const addNode = (node: node) => {
		let tempAdjacencyList = adjacencyList;
		tempAdjacencyList.push({ value: node.value, target: [] });
		setNodeList([
			...nodeList,
			node
		]);
		setAdjacencyList(adjacencyList);
	};

	const addEdge = (edge: edge) => {
		let tempAdjacencyList = adjacencyList;
		for (let item of tempAdjacencyList) {
			if (item.value === edge.source.value) {
				item.target.push(edge.target.value);
			}
		}
		setEdgeList([
			...edgeList,
			edge
		]);
		setAdjacencyList(tempAdjacencyList);
		console.log(adjacencyList);
	};

	const moveNode = (node: node) => {
		const count = node.value;
		const temp = nodeList;
		for (let iter in temp) {
			if (temp[iter].value === count) {
				temp[iter] = node;
			}
		}
		setNodeList(temp);
	};

	const deleteNode = (x: number, y: number) => {
		let index: number = 0;
		for (let iter of nodeList) {
			if (Math.abs(x - iter.clientX) < 20 && Math.abs(y - iter.clientY) < 20) {
				index = iter.value;
			}
		}
		const tempTwo = edgeList.filter((item) => {
			console.log(item.source.value, item.target.value, index);
			return item.source.value !== index && item.target.value !== index;
		});
		setEdgeList(tempTwo);
		const temp = nodeList.filter((item) => {
			return item.value !== index;
		});
		let tempAdjacencyList = adjacencyList;
		let count = tempAdjacencyList.length;
		while (count--) {
			if (tempAdjacencyList[count].value === index) {
				tempAdjacencyList.splice(count, 1);
			}
		}
		for (let item of tempAdjacencyList) {
			let count = item.target.length;
			while (count--) {
				if (item.target[count] === index) {
					item.target.splice(count, 1);
				}
			}
		}

		setAdjacencyList(tempAdjacencyList);
		setNodeList(temp);
	};

	const clearNodes = () => {
		setNodeList([]);
		setEdgeList([]);
		setAdjacencyList([]);
	};

	return (
		<AdjacencyListContext.Provider
			value={{
				nodeList,
				edgeList,
				adjacencyList,
				addNode,
				addEdge,
				clearNodes,
				moveNode,
				deleteNode
			}}
		>
			{props.children}
		</AdjacencyListContext.Provider>
	);
};
