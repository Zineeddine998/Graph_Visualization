import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import adjacencyListObject from '../types/adjacencyListObject';
import edge from '../types/Edge';
import node from '../types/Node';

type SliceState = {
	nodeList: node[];
	edgeList: edge[];
	adjacencyList: adjacencyListObject[];
};

const initialState: SliceState = {
	nodeList: [],
	edgeList: [],
	adjacencyList: []
};

const adjacencyListSlice = createSlice({
	name: 'adjacencyList',
	initialState,
	reducers: {
		ADD_NODE: (state, action: PayloadAction<node>) => {
			action.payload.value = 0;
			if (state.nodeList.length >= 1) action.payload.value = state.nodeList[state.nodeList.length - 1].value + 1;
			const newNode = action.payload;
			const newAdjacencyListItem = { value: action.payload.value, target: [] };
			return {
				...state,
				nodeList: [ ...state.nodeList, newNode ],
				adjacencyList: [ ...state.adjacencyList, newAdjacencyListItem ]
			};
		},

		DELETE_NODE: (state, action: PayloadAction<number>) => {
			const nodeList = state.nodeList.filter((item) => item.value !== action.payload);
			let adjacencyList = state.adjacencyList.filter((item) => item.value !== action.payload);
			adjacencyList = JSON.parse(JSON.stringify(adjacencyList));
			for (let item of adjacencyList) {
				item.target = item.target.filter((item) => item !== action.payload);
			}

			const edgeList = state.edgeList.filter(
				(item) => item.source.value !== action.payload && item.target.value !== action.payload
			);
			return { nodeList, edgeList, adjacencyList };
		},

		ADD_EDGE: (state, action: PayloadAction<edge>) => {},

		DELETE_EDGE: (state, action: PayloadAction<edge>) => {}
	}
});

export const { ADD_NODE, DELETE_NODE, ADD_EDGE, DELETE_EDGE } = adjacencyListSlice.actions;
export default adjacencyListSlice.reducer;
