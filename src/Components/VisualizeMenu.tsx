import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_MESSAGE } from '../Store/snackbar';
import '../Styles/VisualizeMenu.scss';
import node from '../Types/Node';
import { AdjacencyListContext } from '../Context/AdjacencyListContext';
import adjacencyListProvider from '../Types/adjacencyListProvider';
import { CanvasContext } from '../Context/CanvasContext';
import canvasProvider from '../Types/canvasProvider';
import topologicalSort from '../Algorithms/TopologicalSort';
import visualize from '../Actions/visualize';
import breadthFirstTraversal from '../Algorithms/BreadthFirstTraversal';
import depthFirstSeach from '../Algorithms/DepthFirstTraversal';
import DropDownUtils from './DropDownUtils';
import cycleDetection from '../Algorithms/CycleDetection';
import { SnackBarContext } from '../Context/SnackBarContext';
import snackbarProvider from '../Types/snackbarProvider';

const VisualizeMenu = () => {
	const { nodeList, edgeList, adjacencyList } = useContext<adjacencyListProvider>(AdjacencyListContext);
	const { canvas, context } = useContext<canvasProvider>(CanvasContext);
	const dispatch = useDispatch();
	const [ algorithm, setAlgorithm ] = useState<number>(0);

	const algoList = [ 'TopologicalSort', 'Breadth First Traversal', 'Depth First Traversal', 'Graph Cycle Detection' ];

	const handleVisualize = (event: React.FormEvent<HTMLDivElement>) => {
		let errorDetected = false;
		event.preventDefault();
		let result: number[] = [];
		switch (algorithm) {
			case 0: {
				result = topologicalSort(adjacencyList, nodeList);
				break;
			}
			case 1: {
				result = breadthFirstTraversal(adjacencyList);
				break;
			}

			case 2: {
				result = depthFirstSeach(adjacencyList);
				break;
			}
			case 3: {
				({ errorDetected, result } = cycleDetection(adjacencyList));
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
		visualize(nodeList, resultNodes, edgeList, canvas, context).then((val) => {
			console.log(algorithm);
			console.log(errorDetected);
			if (val && algorithm === 3) {
				if (errorDetected) {
					dispatch(SET_MESSAGE('✔️ Cycle detected'));
				}
				else dispatch(SET_MESSAGE('❌ No cycle detected'));
			}
		});
	};

	return (
		<div className="visualize-container">
			{/* <select name="algorithm" className="visualize-select" value={algorithm} onChange={handleSelectChange}>
				<option className="visualize-option" value={1}>
					Topological Sort
				</option>
				<option className="visualize-option" value={2}>
					Breadth First Traversal
				</option>
				<option className="visualize-option" value={3}>
					Depth First Traversal
				</option>
			</select> */}
			<DropDownUtils algoList={algoList} value={algorithm} setAlgo={setAlgorithm} />
			<div className="visualize-button" onClick={handleVisualize}>
				Visualize
			</div>
		</div>
	);
};

export default VisualizeMenu;
