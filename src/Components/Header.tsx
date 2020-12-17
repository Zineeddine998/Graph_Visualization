import React, { useContext, useState } from 'react';
import '../Styles/Header.scss';
import node from '../Types/Node';
import edge from '../Types/Edge';
import { AdjacencyListContext } from '../Context/AdjacencyListContext';
import canvasProvider from '../Types/canvasProvider';
import { CanvasContext } from '../Context/CanvasContext';
import DropDown from './DropDown';

const Header = () => {
	const [
		source,
		setSource
	] = useState<number>(0);
	const [
		target,
		setTarget
	] = useState<number>(0);
	const { nodeList, addEdge, clearNodes } = useContext(AdjacencyListContext);
	const { canvas, context } = useContext<canvasProvider>(CanvasContext);

	const handleThemeChange = (value: boolean): void => {
		console.log('test');
		if (value) {
			trans();
			document.documentElement.setAttribute('data-theme', 'dark');
		}
		else {
			trans();
			document.documentElement.setAttribute('data-theme', 'light');
		}
	};

	// const handleSourceChange = (event: React.FormEvent<HTMLSelectElement>) => {
	//   setSource((event.target as HTMLSelectElement).value);
	// };

	// const handleTargetChange = (event: React.FormEvent<HTMLSelectElement>) => {
	//   setTarget((event.target as HTMLSelectElement).value);
	// };

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
					directed: true
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
				const newEdge: edge = {
					source: sourceNode,
					target: targetNode,
					directed: false
				};
				addEdge(newEdge);
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
			{/* <select
		  value={source}
		  onChange={handleSourceChange}
		  className="source-node dropdown"
		>
		  {nodeList.map((node) => {
			return (
			  <option
				key={node.count}
				value={node.count}
			  >{`Node ${node.count}`}</option>
			);
		  })}
		</select>
		<select
		  value={target}
		  onChange={handleTargetChange}
		  className="target-node dropdown"
		>
		  {nodeList.map((node: node) => {
			if (node.count.toString() !== source) {
			  return (
				<option
				  key={node.count}
				  value={node.count}
				>{`Node ${node.count}`}</option>
			  );
			} else {
			  return <React.Fragment key={Math.random() * 100} />;
			}
		  })}
		</select> */}
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
