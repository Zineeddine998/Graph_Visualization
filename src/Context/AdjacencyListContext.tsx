import React, { createContext, useState, ReactNode } from 'react';
import node from '../Types/Node';
import edge from '../Types/Edge';
import adjacencyListProvider from '../Types/adjacencyListProvider';

const initialState: adjacencyListProvider = {
	edgeList: [],
	nodeList: [],
	addEdge: (edge: edge) => {},
	addNode: (node: node) => {}
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

	return (
		<AdjacencyListContext.Provider value={{ nodeList, addNode, edgeList, addEdge }}>
			{props.children}
		</AdjacencyListContext.Provider>
	);
};
