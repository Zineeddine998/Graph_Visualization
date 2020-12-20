import { EnhancedStore } from "@reduxjs/toolkit";
import createNode from '../Actions/createNode';
import { ADD_NODE, ADD_EDGE, DELETE_NODE, DELETE_EDGE } from '../Store/adjacencyList';
import configureStore from '../Store/configureStore';

let store;
const adjacencyListState = () => {
    return store?.getState().adjacencyList;
};

beforeEach(() =>{
    store = configureStore();
});

test("the node is added to the nodeList and adjacencyList when 'add' function is called", () => {
    const node = createNode(0, 100, 100, 100, 100, 100, 100, "");

    store?.dispatch(ADD_NODE(node));
    expect(adjacencyListState().nodeList).toHaveLength(1);
    expect(adjacencyListState().adjacencyList).toHaveLength(1);
});

test("node is deleted from nodeList, adjacencyList and edgeList when DELETE_NODE is called", () => {
    const node = createNode(0, 100, 100, 100, 100, 100, 100, "");
    const node2 = createNode(0, 100, 100, 100, 100, 100, 100, "");
    const node3 = createNode(0, 100, 100, 100, 100, 100, 100, "");
    const node4 = createNode(0, 100, 100, 100, 100, 100, 100, "");
    const node5 = createNode(0, 100, 100, 100, 100, 100, 100, "");
    const node6 = createNode(0, 100, 100, 100, 100, 100, 100, "");
    const node7 = createNode(0, 100, 100, 100, 100, 100, 100, "");
    const node8 = createNode(0, 100, 100, 100, 100, 100, 100, "");
    store?.dispatch(ADD_NODE(node));
    store?.dispatch(ADD_NODE(node2));
    store?.dispatch(DELETE_NODE(0));
    store?.dispatch(ADD_NODE(node3));
    store?.dispatch(ADD_NODE(node4));
    store?.dispatch(DELETE_NODE(2));
    store?.dispatch(ADD_NODE(node5));
    store?.dispatch(ADD_NODE(node6));
    store?.dispatch(DELETE_NODE(5));
    store?.dispatch(ADD_NODE(node7));
    store?.dispatch(ADD_NODE(node8));
  
    //expect(adjacencyListState().nodeList[0].value).toEqual(1);
    expect(adjacencyListState().nodeList[1].value).toEqual(3);
    expect(adjacencyListState().nodeList[2].value).toEqual(4);
    expect(adjacencyListState().nodeList[3].value).toEqual(5);
    expect(adjacencyListState().nodeList[4].value).toEqual(6);
  });

//   test("edge is added to edgeList and adjacencyList when ADD_EDGE is called", () => {
//     const node = createNode(0, 100, 100, 100, 100, 100, 100, "");
//     const node2 = createNode(0, 100, 100, 100, 100, 100, 100, "");
//     const node3 = createNode(0, 100, 100, 100, 100, 100, 100, "");
//     const node4 = createNode(0, 100, 100, 100, 100, 100, 100, "");
//     const node5 = createNode(0, 100, 100, 100, 100, 100, 100, "");
//     const node6 = createNode(0, 100, 100, 100, 100, 100, 100, "");
//     const node7 = createNode(0, 100, 100, 100, 100, 100, 100, "");
//     const node8 = createNode(0, 100, 100, 100, 100, 100, 100, "");
//   });	