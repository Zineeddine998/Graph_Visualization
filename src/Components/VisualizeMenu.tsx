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

const VisualizeMenu = () => {
	const { nodeList, edgeList, adjacencyList } = useContext<adjacencyListProvider>(AdjacencyListContext);
	const { canvas, context } = useContext<canvasProvider>(CanvasContext);
	const handleVisualize = (event: React.FormEvent<HTMLDivElement>) => {
		event.preventDefault();
		const result = topologicalSort(adjacencyList, nodeList);

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
	console.log('rendered');
	return (
		<div className="visualize-container">
			<select name="algorithm" className="visualize-select">
				<option className="visualize-option">Topological Sort</option>
			</select>
			<div className="visualize-button" onClick={handleVisualize}>
				Visualize
			</div>
		</div>
	);
};

export default VisualizeMenu;
