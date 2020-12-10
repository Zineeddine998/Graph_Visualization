import React, { createContext, useState, ReactNode } from 'react';
import node from '../Types/Node';
import adjacencyListProvider from '../Types/adjacencyListProvider';

const initialState: adjacencyListProvider = {
	adjacencyList: [],
	addNode: (node: node) => {}
};

export const AdjacencyListContext = createContext<adjacencyListProvider>(initialState);

type IProps = {
	children: ReactNode;
};

export const AdjacencyListContextProvider = (props: IProps) => {
	const [
		adjacencyList,
		setAdjacencyList
	] = useState<node[]>([]);
	const addNode = (node: node) => {
		setAdjacencyList([
			...adjacencyList,
			node
		]);
	};

	return (
		<AdjacencyListContext.Provider value={{ adjacencyList, addNode }}>
			{props.children}
		</AdjacencyListContext.Provider>
	);
};
