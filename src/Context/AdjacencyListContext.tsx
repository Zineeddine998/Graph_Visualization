import React, { createContext, useState, ReactNode } from 'react';
import node from '../Types/Node';
import edge from '../Types/Edge';
import adjacencyListProvider from '../Types/adjacencyListProvider';

const initialState: adjacencyListProvider = {
	edgeList: [],
	nodeList: [],
	addEdge: (edge: edge) => {},
	addNode: (node: node) => {},
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

	const deleteNode = (x: number, y: number) => {
		let index: number = 0;
		for (let item of nodeList) {
			if (Math.abs(x - item.clientX) < 20 && Math.abs(y - item.clientY) < 20) {
				console.log(index);
				break;
			}
			index++;
		}
		if (index !== null) {
			let temp = nodeList;
			temp.splice(index, 1);
			console.log('spliced');
			setNodeList(temp);
			for (let item = edgeList.length - 1; item > 0; item--) {
				if (edgeList[item].source.value === index || edgeList[item].target.value === index) {
					let temp = edgeList;
					temp.splice(index, 1);
					setEdgeList(temp);
				}
			}
		}
	};

	return (
		<AdjacencyListContext.Provider value={{ nodeList, addNode, edgeList, addEdge, clearNodes, deleteNode }}>
			{props.children}
		</AdjacencyListContext.Provider>
	);
};
