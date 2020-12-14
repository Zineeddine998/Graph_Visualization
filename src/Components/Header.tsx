import React, { useContext, useState } from 'react';
import '../Styles/Header.scss';
import node from '../Types/Node';
import edge from '../Types/Edge';
import { AdjacencyListContext } from '../Context/AdjacencyListContext';
import canvasProvider from '../Types/canvasProvider';
import { CanvasContext } from '../Context/CanvasContext';
import drawEdge from '../Actions/drawEdge';
import drawNode from '../Actions/drawNode';

const Header = () => {
	// const transform = () => {
	// 	return null;
	// };
	const [
		source,
		setSource
	] = useState<string>('');
	const [
		target,
		setTarget
	] = useState<string>('');
	const { nodeList, edgeList, addNode, addEdge, clearNodes } = useContext(AdjacencyListContext);

	const { canvas, context } = useContext<canvasProvider>(CanvasContext);
	console.log(nodeList, edgeList, addNode, addEdge);

	let newNode: node = nodeList[0];
	console.log(newNode);

	const handleClearCanvas = (event: React.FormEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (context && canvas) {
			context.clearRect(0, 0, canvas.width, canvas.height);
			clearNodes();
		}
	};
	const handleThemeChange = (value: boolean): void => {
		if (value) {
			transform();
			document.documentElement.setAttribute('data-theme', 'dark');
		}
		else {
			transform();
			document.documentElement.setAttribute('data-theme', 'light');
		}
	};

	const handleSourceChange = (event: React.FormEvent<HTMLSelectElement>) => {
		setSource((event.target as HTMLSelectElement).value);
	};

	const handleTargetChange = (event: React.FormEvent<HTMLSelectElement>) => {
		setTarget((event.target as HTMLSelectElement).value);
	};

	const handleNewDirectedEdge = (event: React.FormEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (context && canvas) {
			let sourceNb: number = +source;
			let targetNb: number = +target;
			let sourceNode: node | null = null;
			let targetNode: node | null = null;
			for (let item of nodeList) {
				if (item.value === sourceNb) {
					sourceNode = item;
				}
				else if (item.value === targetNb) {
					targetNode = item;
				}
			}

			if (sourceNode && targetNode) {
				const newEdge: edge = {
					source: sourceNode,
					target: targetNode
				};
				addEdge(newEdge);
			}
		}
	};

	const handleNewUndirectedEdge = (event: React.FormEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (context && canvas) {
			let sourceNb: number = +source;
			let targetNb: number = +target;
			let sourceNode: node | null = null;
			let targetNode: node | null = null;
			for (let item of nodeList) {
				if (item.value === sourceNb) {
					sourceNode = item;
				}
				else if (item.value === targetNb) {
					targetNode = item;
				}
			}

			if (sourceNode && targetNode) {
				const newEdge: edge = {
					source: sourceNode,
					target: targetNode
				};
				addEdge(newEdge);
			}
		}
	};

	let transform = () => {
		document.documentElement.classList.add('transition');
		window.setTimeout(() => {
			document.documentElement.classList.remove('transition');
		}, 1000);
	};

	return (
		<header className="navbar">
			<h4 className="header-text">Graph Visualisation</h4>
			<select value={source} onChange={handleSourceChange} className="source-node">
				{nodeList.map((node) => {
					return <option key={node.value} value={node.value}>{`Node ${node.value}`}</option>;
				})}
			</select>
			<select value={target} onChange={handleTargetChange} className="target-node">
				{nodeList.map((node: node) => {
					if (node.value.toString() !== source) {
						return <option key={node.value} value={node.value}>{`Node ${node.value}`}</option>;
					}
					else {
						return <React.Fragment key={Math.random() * 100} />;
					}
				})}
			</select>
			<button className="add-edge" onClick={handleNewDirectedEdge}>
				Add Directed Edge
			</button>
			<button className="add-edge" onClick={handleNewUndirectedEdge}>
				Add Undirected Edge
			</button>
			<button className="clear-canvas" onClick={handleClearCanvas}>
				Clear Nodes
			</button>
			<div className="toggle-container">
				<input
					type="checkbox"
					id="swtich"
					className="toggle-switch"
					onClick={(event) => {
						handleThemeChange((event.target as HTMLInputElement).checked);
					}}
				/>
				<label htmlFor="swtich" className="toggle-label">
					Switch
				</label>
			</div>
		</header>
	);
};

export default Header;
