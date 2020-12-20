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
			if (state.nodeList.length > 1) action.payload.value = state.nodeList[state.nodeList.length - 1].value + 1;
			state.nodeList.push(action.payload);
			state.adjacencyList.push({ value: action.payload.value, target: [] });
		},

		DELETE_NODE: (state, action: PayloadAction<number>) => {},

		ADD_EDGE: (state, action: PayloadAction<number>) => {},

		DELETE_EDGE: (state, action: PayloadAction<number>) => {}
	}
});

export const { ADD_NODE, DELETE_NODE, ADD_EDGE, DELETE_EDGE } = adjacencyListSlice.actions;
export default adjacencyListSlice.reducer;
