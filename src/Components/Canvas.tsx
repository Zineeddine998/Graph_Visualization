import React, { useState, useEffect, useRef, useContext } from 'react';
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

const Canvas = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const intialContextMenu: contextMenu = { isOpen: false, x: 0, y: 0 };
	const [
		contextMenu,
		setContextMenu
	] = useState<contextMenu>(intialContextMenu);

	const [
		width,
		height
	] = useWindowSize();

	const { nodeList, addNode, edgeList } = useContext<adjacencyListProvider>(AdjacencyListContext);

	const { canvas, context, setCanvas, setContext } = useContext<canvasProvider>(CanvasContext);

	const setContextMenuState = (state: boolean, x: number = 0, y: number = 0): void => {
		const newContextMenuState: contextMenu = {
			isOpen: state,
			x: x,
			y: y
		};
		setContextMenu(newContextMenuState);
	};
	const handleClick = (event: React.MouseEvent): void => {
		if (contextMenu.isOpen === false) {
			if (canvas) {
				const rect = canvas.getBoundingClientRect();
				const x = event.clientX - rect.left;
				const y = event.clientY - rect.top;
				if (context) {
					const nodeCount: number = getNextIndex(nodeList);
					// context.beginPath();
					// context.arc(x, y, 10, 0, 2 * Math.PI, false);
					// context.lineWidth = 3;
					// context.stroke();
					// context.font = '20px Hack';
					// context.textAlign = 'center';
					// context.textBaseline = 'middle';
					// context.fillText(nodeCount.toString(), x, y);
					// let newNode = createNode(nodeCount, x, y);
					console.log(nodeCount.toString());
					drawNode(nodeCount, context, x, y);
					const newNode: node = createNode(
						nodeCount,
						x,
						y,
						event.clientX,
						event.clientY,
						rect.right,
						rect.bottom
					);
					addNode(newNode);
					console.log(nodeList);

					//context.fill();
				}
			}
		}
		else {
			setContextMenuState(false);
		}
	};

	const handleRightClick = (event: React.MouseEvent): void => {
		event.preventDefault();
		setContextMenuState(true, event.pageX, event.pageY);
	};

	useEffect(
		() => {
			let canvas = canvasRef.current;
			if (canvas) {
				setCanvas(canvas);
				setContext(canvas.getContext('2d'));
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
			}
			//setCanvas(canvasRef.current);
			redrawCanvas(nodeList, edgeList, canvas, context);
		},
		[
			width,
			height,
			nodeList,
			edgeList,
			setCanvas,
			setContext
		]
	);

	return (
		<div className="canvas-container">
			{
				contextMenu.isOpen ? <ContextMenu
					contextmenu={contextMenu}
					setContextMenuState={setContextMenuState}
				/> :
				<React.Fragment />}
			<canvas ref={canvasRef} onClick={handleClick} className="canvas" onContextMenu={handleRightClick} />
		</div>
	);
};

export default Canvas;
