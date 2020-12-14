import React, { createContext, useState, ReactNode } from 'react';
import node from '../Types/Node';
import edge from '../Types/Edge';
import adjacencyListProvider from '../Types/adjacencyListProvider';

const initialState: adjacencyListProvider = {
	edgeList: [],
	nodeList: [],
	addEdge: (edge: edge) => {},
	addNode: (node: node) => {},
	moveNode: (index: node) => {},
	clearNodes: () => {},
	deleteNode: (x: number, y: number) => {}
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
	const addNode = (node: node) => {
		setNodeList([
			...nodeList,
			node
		]);
	};
	const addEdge = (edge: edge) => {
		setEdgeList([
			...edgeList,
			edge
		]);
	};
	const clearNodes = () => {
		setNodeList([]);
		setEdgeList([]);
	};

	const moveNode = (node: node) => {
		const valueNode = node.value;
		const temp = nodeList;
		for (let item in temp) {
			if (temp[item].value === valueNode) {
				temp[item] = node;
			}
		}
		setNodeList(temp);
	};

	const deleteNode = (x: number, y: number) => {
		let index: number = 0;
		for (let item of nodeList) {
			if (Math.abs(x - item.clientX) < 20 && Math.abs(y - item.clientY) < 20) {
				index = item.value;
			}
		}
		const list = edgeList.filter((item) => {
			console.log(item.source.value, item.target.value, index);
			return item.source.value !== index && item.target.value !== index;
		});
		setEdgeList(list);
		const secondList = nodeList.filter((item) => {
			return item.value !== index;
		});

		console.log('spliced');

		setNodeList(secondList);
		console.log(edgeList);
	};

	return (
		<AdjacencyListContext.Provider
			value={{ nodeList, addNode, edgeList, addEdge, clearNodes, deleteNode, moveNode }}
		>
			{props.children}
		</AdjacencyListContext.Provider>
	);
};
