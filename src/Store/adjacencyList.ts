import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import adjacencyListObject from '../Types/adjacencyListObject';
import { act } from 'react-dom/test-utils';
import edge from '../Types/Edge';
import node from '../Types/Node';

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

export const getNodeListSelector = (state: SliceState) => state.nodeList;
export const getAdjacencyListSelector = (state: SliceState) => state.adjacencyList;
export const getEdgeListSelector = (state: SliceState) => state.edgeList;

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

		ADD_EDGE: (state, action: PayloadAction<edge>) => {
			const adjacencyList = JSON.parse(JSON.stringify(state.adjacencyList));
			for (let item of adjacencyList) {
				if (item.value === action.payload.source.value) {
					item.target = [ ...item.target, action.payload.target.value ];
				}
				if (item.value === action.payload.target.value && action.payload.directed === false) {
					item.target = [ ...item.target, action.payload.source.value ];
				}
			}

			return {
				...state,
				edgeList: [ ...state.edgeList, action.payload ],
				adjacencyList
			};
		},

		DELETE_EDGE: (state, action: PayloadAction<edge>) => {
			const adjacencyList = JSON.parse(JSON.stringify(state.adjacencyList));
			const edgeList = state.edgeList.filter(
				(item) =>
					item.source.value !== action.payload.source.value ||
					item.target.value !== action.payload.target.value
			);
			for (let item of adjacencyList) {
				if (item.count === action.payload.source.value) {
					item.target = item.target.filter((iter: number) => iter !== action.payload.target.value);
				}
				if (action.payload.directed === false && item.count === action.payload.target.value) {
					item.target = item.target.filter((iter: number) => iter !== action.payload.source.value);
				}
			}
			return {
				...state,
				edgeList,
				adjacencyList
			};
		}
	}
});

export const { ADD_NODE, DELETE_NODE, ADD_EDGE, DELETE_EDGE } = adjacencyListSlice.actions;
export default adjacencyListSlice.reducer;
