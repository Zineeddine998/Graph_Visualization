import { EnhancedStore } from "@reduxjs/toolkit";
import createEdge from '../Actions/createEdge';
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
    const node2 = createNode(1, 100, 100, 100, 100, 100, 100, "");
    const node3 = createNode(2, 100, 100, 100, 100, 100, 100, "");
    const node4 = createNode(3, 100, 100, 100, 100, 100, 100, "");
    const node5 = createNode(4, 100, 100, 100, 100, 100, 100, "");
    const node6 = createNode(5, 100, 100, 100, 100, 100, 100, "");
    const node7 = createNode(6, 100, 100, 100, 100, 100, 100, "");
    const node8 = createNode(7, 100, 100, 100, 100, 100, 100, "");
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
  
    expect(adjacencyListState().nodeList[0].value).toEqual(1);
    expect(adjacencyListState().nodeList[1].value).toEqual(3);
    expect(adjacencyListState().nodeList[2].value).toEqual(4);
    expect(adjacencyListState().nodeList[3].value).toEqual(5);
    expect(adjacencyListState().nodeList[4].value).toEqual(6);
    expect(adjacencyListState().adjacencyList.length).toEqual(5);
  });

  test("edge is added to edgeList and adjacencyList when ADD_EDGE is called", () => {
    const node = createNode(0, 100, 100, 100, 100, 100, 100, "");
    const node2 = createNode(0, 100, 100, 100, 100, 100, 100, "");
    const node3 = createNode(0, 100, 100, 100, 100, 100, 100, "");
    const node4 = createNode(0, 100, 100, 100, 100, 100, 100, "");
    const node5 = createNode(0, 100, 100, 100, 100, 100, 100, "");
    const node6 = createNode(0, 100, 100, 100, 100, 100, 100, "");
    const node7 = createNode(0, 100, 100, 100, 100, 100, 100, "");
    const node8 = createNode(0, 100, 100, 100, 100, 100, 100, "");
    const edge = createEdge(node, node2, true);
    const edge2 = createEdge(node3, node4, true);
    const edge3 = createEdge(node4, node5, true);
    const edge4 = createEdge(node7, node8, true);
  
    store?.dispatch(ADD_NODE(node));
    store?.dispatch(ADD_NODE(node2));
    store?.dispatch(ADD_EDGE(edge));
    store?.dispatch(DELETE_NODE(0));
    store?.dispatch(ADD_NODE(node3));
    store?.dispatch(ADD_NODE(node4));
    store?.dispatch(ADD_EDGE(edge2));
    store?.dispatch(DELETE_NODE(2));
    store?.dispatch(ADD_NODE(node5));
    store?.dispatch(ADD_EDGE(edge3));
    store?.dispatch(ADD_NODE(node6));
    store?.dispatch(DELETE_NODE(5));
    store?.dispatch(ADD_NODE(node7));
    store?.dispatch(ADD_NODE(node8));
    store?.dispatch(ADD_EDGE(edge4));
  
    expect(adjacencyListState().edgeList.length).toEqual(2);
    expect(adjacencyListState().edgeList[0]).toEqual(edge3);
    expect(adjacencyListState().edgeList[1]).toEqual(edge4);
    expect(adjacencyListState().adjacencyList[1].target[0]).toEqual(4);
    expect(adjacencyListState().adjacencyList[3].target[0]).toEqual(6);
  });


  test("edge is deleted from edgeList and adjacencyList when DELETE_EDGE is called", () => {
    const node = createNode(0, 100, 100, 100, 100, 100, 100, "");
    const node2 = createNode(0, 100, 100, 100, 100, 100, 100, "");
    const node3 = createNode(0, 100, 100, 100, 100, 100, 100, "");
    const node4 = createNode(0, 100, 100, 100, 100, 100, 100, "");
    const node5 = createNode(0, 100, 100, 100, 100, 100, 100, "");
    const node6 = createNode(0, 100, 100, 100, 100, 100, 100, "");
    const node7 = createNode(0, 100, 100, 100, 100, 100, 100, "");
    const node8 = createNode(0, 100, 100, 100, 100, 100, 100, "");
    const edge = createEdge(node, node2, false);
    const edge2 = createEdge(node3, node4, true);
    const edge3 = createEdge(node4, node5, true);
    const edge4 = createEdge(node7, node8, true);
    const edge5 = createEdge(node4, node8, true);
    const edge6 = createEdge(node2, node5, false);
    const edge7 = createEdge(node5, node8, false);
  
    store?.dispatch(ADD_NODE(node));
    store?.dispatch(ADD_NODE(node2));
    store?.dispatch(ADD_EDGE(edge));
    store?.dispatch(DELETE_NODE(0));
    store?.dispatch(ADD_NODE(node3));
    store?.dispatch(ADD_NODE(node4));
    store?.dispatch(ADD_EDGE(edge2));
    store?.dispatch(DELETE_NODE(2));
    store?.dispatch(ADD_NODE(node5));
    store?.dispatch(ADD_EDGE(edge3));
    store?.dispatch(ADD_NODE(node6));
    store?.dispatch(DELETE_NODE(5));
    store?.dispatch(ADD_NODE(node7));
    store?.dispatch(ADD_NODE(node8));
    store?.dispatch(ADD_EDGE(edge4));
    store?.dispatch(ADD_EDGE(edge5));
    store?.dispatch(ADD_EDGE(edge6));
    store?.dispatch(ADD_EDGE(edge7));
    store?.dispatch(DELETE_EDGE(edge3));
    store?.dispatch(DELETE_EDGE(edge4));
    store?.dispatch(DELETE_EDGE(edge6));
  
    expect(adjacencyListState().edgeList.length).toEqual(2);
    expect(adjacencyListState().adjacencyList[0].target.length).toEqual(1);
    expect(adjacencyListState().adjacencyList[1].target[0]).toEqual(4);
    expect(adjacencyListState().adjacencyList[2].target.length).toEqual(2);
    expect(adjacencyListState().adjacencyList[2].target[0]).toEqual(1);
    expect(adjacencyListState().adjacencyList[4].target[0]).toEqual(4);
  });