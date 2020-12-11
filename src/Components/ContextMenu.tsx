import React, { useEffect, useContext } from 'react';
import { CanvasContext } from '../Context/CanvasContext';
import contextMenu from '../Types/contextMenu';
import canvasProvider from '../Types/canvasProvider';
import { AdjacencyListContext } from '../Context/AdjacencyListContext';
import node from '../Types/Node';
import drawNode from '../Actions/drawNode';
import createNode from '../Actions/createNode';
import adjacencyListProvider from '../Types/adjacencyListProvider';
import contextMenuState from '../Actions/contextMenuState';
import getNextIndex from '../Actions/getNextIndex';
import redrawCanvas from '../Actions/redrawCanvas';

type AppProps = {
	contextmenu: contextMenu;
	setContextMenuState(state: boolean, x?: number, y?: number): void;
};

const ContextMenu = ({ contextmenu, setContextMenuState }: AppProps) => {
	const { isOpen, x, y } = contextmenu;
	const { canvas, context } = useContext<canvasProvider>(CanvasContext);
	const { nodeList, edgeList, addNode, clearNodes, deleteNode } = useContext<adjacencyListProvider>(
		AdjacencyListContext
	);
	let innerX = x;
	let innerY = y;
	if (x + 200 > window.innerWidth) {
		innerX = x - 200;
	}
	if (y + 150 > window.innerHeight) {
		innerY = y - 150;
	}

	useEffect(() => {}, [
		x,
		y,
		nodeList
	]);

	const result = contextMenuState(nodeList, x, y);

	const handleRightClick = (event: React.MouseEvent): void => {
		event.preventDefault();
	};

	const handleAddNode = (event: React.FormEvent<HTMLDivElement>): void => {
		event.preventDefault();
		if (canvas) {
			const rect = canvas.getBoundingClientRect();
			const xPos = x - rect.left;
			const yPos = y - rect.top;
			if (context) {
				const nodeCount: number = getNextIndex(nodeList);
				drawNode(nodeCount, context, xPos, yPos);
				const newNode: node = createNode(nodeCount, xPos, yPos, x, y, rect.right, rect.bottom);
				addNode(newNode);
			}
			setContextMenuState(false);
		}
	};

	const handleClearCanvas = (event: React.FormEvent<HTMLDivElement>): void => {
		event.preventDefault();
		if (context && canvas) {
			context.clearRect(0, 0, canvas.width, canvas.height);
			clearNodes();
		}
		setContextMenuState(false);
	};

	const handleAddDirectedEdge = (event: React.FormEvent<HTMLDivElement>): void => {
		event.preventDefault();
		console.log('this is the handler for adding directed edges');
		setContextMenuState(false);
	};

	const handleAddUndirectedEdge = (event: React.FormEvent<HTMLDivElement>): void => {
		event.preventDefault();
		console.log('this is the handler for adding undirected edges');
		setContextMenuState(false);
	};

	const handleDeleteNode = (event: React.FormEvent<HTMLDivElement>): void => {
		deleteNode(x, y);
		redrawCanvas(nodeList, edgeList, canvas, context);
		setContextMenuState(false);
	};

	return (
		<div
			className="context-menu"
			style={{ left: innerX, top: innerY, position: 'absolute' }}
			onContextMenu={handleRightClick}
		>
			{
				result ? <div>
					<div className="context-menu-option" onClick={handleAddNode}>
						Add Node
					</div>
					<div className="context-menu-option" onClick={handleClearCanvas}>
						Clear Canvas
					</div>
					<div className="context-menu-option" onClick={handleAddDirectedEdge}>
						Add Directed Edge
					</div>
					<div className="context-menu-option" onClick={handleAddUndirectedEdge}>
						Add Undirected Edge
					</div>
				</div> :
				<div className="context-menu-option" onClick={handleDeleteNode}>
					Delete Node
				</div>}
		</div>
	);
};

export default ContextMenu;
