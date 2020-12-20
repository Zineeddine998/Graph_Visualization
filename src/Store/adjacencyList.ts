import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import adjacencyListObject from '../Types/adjacencyListObject';
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

const adjacencyListSlice = createSlice({
	name: 'adjacencyList',
	initialState,
	reducers: {
		addNode: (state, action: PayloadAction<node>) => {
			state.nodeList.push(action.payload);
		}
	}
});

export const { addNode } = adjacencyListSlice.actions;
export default adjacencyListSlice.reducer;
