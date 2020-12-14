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
		newNode,
		setNewNode
	] = useState<node | null>(null);

	const [
		contextMenu,
		setContextMenu
	] = useState<contextMenu>(intialContextMenu);

	const [
		width,
		height
	] = useWindowSize();

	const { nodeList, addNode, edgeList, moveNode } = useContext<adjacencyListProvider>(AdjacencyListContext);

	const { canvas, context, setCanvas, setContext } = useContext<canvasProvider>(CanvasContext);

	const setContextMenuState = (state: boolean, x: number = 0, y: number = 0): void => {
		const newContextMenuState: contextMenu = {
			isOpen: state,
			x: x,
			y: y
		};
		setContextMenu(newContextMenuState);
	};

	const handleRightClick = (event: React.MouseEvent): void => {
		event.preventDefault();
		setContextMenuState(true, event.pageX, event.pageY);
	};
	const handleMouseDown = (event: React.MouseEvent): void => {
		event.preventDefault();
		if (canvas && event.buttons === 1) {
			const x = event.clientX;
			const y = event.clientY;
			const rect = canvas.getBoundingClientRect();
			let index: number = -1;
			for (let item in nodeList) {
				if (Math.abs(x - nodeList[item].clientX) < 20 && Math.abs(y - nodeList[item].clientY) < 20) {
					index = +item;
				}
			}

			if (index > -1) {
				console.log(index);
				let node = nodeList[index];
				node.clientX = x;
				node.canvasY = y;
				node.canvasX = x - rect.left;
				node.canvasY = y - rect.top;
				setNewNode(node);
			}
		}
	};

	const handleMouseMove = (event: React.MouseEvent): void => {
		event.preventDefault();
		if (newNode && canvas && event.buttons === 1) {
			const x = event.clientX;
			const y = event.clientY;
			let node = newNode;
			let rect = canvas.getBoundingClientRect();
			node.clientX = x;
			node.clientY = y;
			node.canvasX = x - rect.left;
			node.canvasY = y - rect.top;
			setNewNode(node);

			moveNode(newNode);
			redrawCanvas(nodeList, edgeList, canvas, context);
		}
	};

	const handleMouseUp = (event: React.MouseEvent): void => {
		event.preventDefault();
		if (newNode) {
			setNewNode(null);
		}
		else {
			if (contextMenu.isOpen === false && canvas) {
				const rect = canvas.getBoundingClientRect();
				const x = event.clientX - rect.left;
				const y = event.clientY - rect.top;
				addNode(newNode);
				console.log(nodeList);
			}
			else {
				setContextMenuState(false);
			}
		}
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

	const handleMouseOut = (event: React.MouseEvent): void => {
		event.preventDefault();
		setNewNode(null);
	};
	return (
		<div className="canvas-container">
			{
				contextMenu.isOpen ? <ContextMenu
					contextmenu={contextMenu}
					setContextMenuState={setContextMenuState}
				/> :
				<React.Fragment />}
			<canvas
				ref={canvasRef}
				onClick={handleRightClick}
				className="canvas"
				onContextMenu={handleRightClick}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseOut={handleMouseOut}
			/>
		</div>
	);
};

export default Canvas;
