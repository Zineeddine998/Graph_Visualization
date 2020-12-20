import { EnhancedStore } from "@reduxjs/toolkit";
import createNode from '../Actions/createNode';
import { addNode } from '../Store/adjacencyList';
import configureStore from '../Store/configureStore';

let store;

beforeEach(() =>{
    store = configureStore();
});

test("the node is added to the nodeList when add function is called", () => {
    const node = createNode(0, 100, 100, 100, 100, 100, 100, "");

    store?.dispatch(addNode(node));

    expect(store?.getState().adjacencyList.nodeList).toHaveLength(1);
});
