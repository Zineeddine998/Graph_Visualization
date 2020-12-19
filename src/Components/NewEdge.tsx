import React, { useContext } from 'react';
import node from '../Types/Node';
import edge from '../Types/Edge';
import canvasProvider from '../Types/canvasProvider';
import { AdjacencyListContext } from '../Context/AdjacencyListContext';
import { CanvasContext } from '../Context/CanvasContext';

type AppProps = { source: number; target: number; directed: boolean; weight?: number };

const NewEdge = ({ source, target, directed }: AppProps) => {
	const { nodeList, addEdge, addUndirectedEdge } = useContext(AdjacencyListContext);
	const { canvas, context } = useContext<canvasProvider>(CanvasContext);
	const handleAddDirectedEdge = (event: React.MouseEvent) => {
		event.preventDefault();
		if (context && canvas) {
			let sourceNb: number = source;
			let targetNb: number = target;
			let sourceNode: node | null = null;
			let targetNode: node | null = null;
			for (let elem of nodeList) {
				if (elem.value === sourceNb) {
					sourceNode = elem;
				}
				else if (elem.value === targetNb) {
					targetNode = elem;
				}
			}
			if (sourceNode && targetNode) {
				const newEdge: edge = {
					source: sourceNode,
					target: targetNode,
					directed: true,
					weight: 1
				};

				addEdge(newEdge);
			}
		}
	};
	const handleAddUndirectedEdge = (event: React.MouseEvent) => {
		event.preventDefault();
		if (context && canvas) {
			let sourceNb: number = +source;
			let targetNb: number = +target;
			let sourceNode: node | null = null;
			let targetNode: node | null = null;
			for (let elem of nodeList) {
				if (elem.value === sourceNb) {
					sourceNode = elem;
				}
				else if (elem.value === targetNb) {
					targetNode = elem;
				}
			}

			if (sourceNode && targetNode) {
				const firstEdge: edge = {
					source: sourceNode,
					target: targetNode,
					directed: false,
					weight: 1
				};
				const secondEdge: edge = {
					source: targetNode,
					target: sourceNode,
					directed: false,
					weight: 1
				};
				addUndirectedEdge(firstEdge, secondEdge);
			}
		}
	};

	return (
		<div
			key={target}
			onClick={

					directed ? handleAddDirectedEdge :
					handleAddUndirectedEdge
			}
			className="context-menu-option context-menu-edge-option"
		>
			Node {target}
		</div>
	);
};

export default NewEdge;
