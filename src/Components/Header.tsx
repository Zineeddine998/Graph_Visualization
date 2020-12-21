import React, { useContext, useState } from 'react';
import '../Styles/Variables.scss';
import '../Styles/Header.scss';
import node from '../Types/Node';
import edge from '../Types/Edge';
import { AdjacencyListContext } from '../Context/AdjacencyListContext';
import canvasProvider from '../Types/canvasProvider';
import { CanvasContext } from '../Context/CanvasContext';
import DropDown from './DropDown';
import redrawCanvas from '../Actions/redrawCanvas';
import edgeColor from '../Actions/edgeColor';
import fontColor from '../Actions/fontColor';

const Header = () => {
	const [ source, setSource ] = useState<number>(0);
	const [ target, setTarget ] = useState<number>(0);
	const { nodeList, edgeList, addEdge, addUndirectedEdge, clearNodes } = useContext(AdjacencyListContext);
	const { canvas, context } = useContext<canvasProvider>(CanvasContext);

	const handleThemeChange = (value: boolean): void => {
		console.log('test');
		if (value) {
			trans();
			document.documentElement.setAttribute('data-theme', 'dark');
			redrawCanvas(nodeList, edgeList, canvas, context, edgeColor(document), fontColor(document));
		}
		else {
			trans();
			document.documentElement.setAttribute('data-theme', 'light');
			redrawCanvas(nodeList, edgeList, canvas, context, edgeColor(document), fontColor(document));
		}
	};

	const handleNewDirectedEdge = (event: React.FormEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (context && canvas) {
			let sourceNum: number = source;
			let targetNum: number = target;
			let sourceNode: node | null = null;
			let targetNode: node | null = null;
			for (let itr of nodeList) {
				if (itr.value === sourceNum) {
					sourceNode = itr;
				}
				else if (itr.value === targetNum) {
					targetNode = itr;
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

	const handleNewUndirectedEdge = (event: React.FormEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (context && canvas) {
			let sourceNum: number = source;
			let targetNum: number = target;
			let sourceNode: node | null = null;
			let targetNode: node | null = null;
			for (let itr of nodeList) {
				if (itr.value === sourceNum) {
					sourceNode = itr;
				}
				else if (itr.value === targetNum) {
					targetNode = itr;
				}
			}
			if (sourceNode && targetNode) {
				const edgeOne: edge = {
					source: sourceNode,
					target: targetNode,
					directed: false,
					weight: 1
				};
				const edgeTwo: edge = {
					source: targetNode,
					target: sourceNode,
					directed: false, //
					weight: 1
				};
				addUndirectedEdge(edgeOne, edgeTwo);
			}
		}
	};

	const handleClearCanvas = (event: React.FormEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (context && canvas) {
			context.clearRect(0, 0, canvas.width, canvas.height);
			clearNodes();
		}
	};

	let trans = () => {
		document.documentElement.classList.add('transition');
		window.setTimeout(() => {
			document.documentElement.classList.remove('transition');
		}, 1000);
	};

	return (
		<header className="navbar">
			<DropDown nodeList={nodeList} value={source} setNode={setSource} />
			<DropDown nodeList={nodeList} value={target} setNode={setTarget} />
			<button className="add-edge-one header-button" onClick={handleNewDirectedEdge}>
				Add Directed Edge
			</button>
			<button className="add-edge-two header-button" onClick={handleNewUndirectedEdge}>
				Add Undirected Edge
			</button>
			<button className="clear-canvas header-button" onClick={handleClearCanvas}>
				Clear Canvas
			</button>
			<div className="toggle-container">
				<input
					type="checkbox"
					id="switch"
					className="toggle-switch"
					onClick={(event) => {
						handleThemeChange((event.target as HTMLInputElement).checked);
					}}
				/>
				<label className="toggle-label" htmlFor="switch">
					Toggle
				</label>
			</div>
		</header>
	);
};

export default Header;
