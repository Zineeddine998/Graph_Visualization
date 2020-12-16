import React, { useState, useEffect, useRef, useContext } from 'react';
import '../Styles/VisualizeMenu.scss';
import { convertToObject } from 'typescript';
import useWindowSize from '../Hooks/WindowSize';
import node from '../Types/Node';
import edge from '../Types/Edge';
import createNode from '../Actions/createNode';
import { AdjacencyListContext } from '../Context/AdjacencyListContext';
import adjacencyListProvider from '../Types/adjacencyListProvider';
import { CanvasContext } from '../Context/CanvasContext';
import canvasProvider from '../Types/canvasProvider';
import redrawCanvas from '../Actions/redrawCanvas';
import drawNode from '../Actions/drawNode';
import contextMenu from '../Types/contextMenu';
import ContextMenu from './ContextMenu';
import getNextIndex from '../Actions/getNextIndex';
import topologicalSort from '../Algorithms/TopologicalSort';
import visualize from '../Actions/visualize';
import breadthFirstTraversal from '../Algorithms/BreadthFirstTraversal';
import depthFirstSeach from '../Algorithms/DepthFirstTraversal';

const VisualizeMenu = () => {
	const { nodeList, edgeList, adjacencyList } = useContext<adjacencyListProvider>(AdjacencyListContext);
	const { canvas, context } = useContext<canvasProvider>(CanvasContext);
	const [
		algorithm,
		setAlgorithm
	] = useState<number>(1);

	const handleVisualize = (event: React.FormEvent<HTMLDivElement>) => {
		event.preventDefault();
		let result: number[] = [];
		switch (algorithm) {
			case 1: {
				result = topologicalSort(adjacencyList, nodeList);
				break;
			}
			case 2: {
				result = breadthFirstTraversal(adjacencyList);
				break;
			}

			case 3: {
				result = depthFirstSeach(adjacencyList);
				break;
			}

			default: {
				result = [];
			}
		}

		let resultNodes: node[] = [];
		for (let item of result) {
			for (let innerItem of nodeList) {
				if (innerItem.value === item) {
					resultNodes.push(innerItem);
				}
			}
		}
		visualize(resultNodes, edgeList, canvas, context);
	};

	const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault();
		setAlgorithm(+event.target.value);
	};
	return (
		<div className="visualize-container">
			<select name="algorithm" className="visualize-select" value={algorithm} onChange={handleSelectChange}>
				<option className="visualize-option" value={1}>
					Topological Sort
				</option>
				<option className="visualize-option" value={2}>
					Breadth First Traversal
				</option>
				<option className="visualize-option" value={3}>
					Depth First Traversal
				</option>
			</select>
			<div className="visualize-button" onClick={handleVisualize}>
				Visualize
			</div>
		</div>
	);
};

export default VisualizeMenu;
