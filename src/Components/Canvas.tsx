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
import drawNode from '../Actions/drawNode';

const Canvas = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const [
		width,
		height
	] = useWindowSize();

	const { nodeList, addNode, edgeList } = useContext<adjacencyListProvider>(AdjacencyListContext);

	const { canvas, context, setCanvas, setContext } = useContext<canvasProvider>(CanvasContext);
	console.log(edgeList);
	const handleClick = (clientX: number, clientY: number): void => {
		if (canvas) {
			const rect = canvas.getBoundingClientRect();
			const x = clientX - rect.left;
			const y = clientY - rect.top;
			console.log(edgeList);
			if (context) {
				const nodeCount: number = nodeList.length;
				// context.beginPath();
				// context.arc(x, y, 10, 0, 2 * Math.PI, false);
				// context.lineWidth = 3;
				// context.stroke();
				// context.font = '20px Hack';
				// context.textAlign = 'center';
				// context.textBaseline = 'middle';
				// context.fillText(nodeCount.toString(), x, y);
				// let newNode = createNode(nodeCount, x, y);
				drawNode(nodeCount, context, x, y);
				let newNode: node = createNode(nodeCount, x, y, rect.right, rect.bottom);
				addNode(newNode);
				console.log(nodeList);
				console.log(edgeList);

				context.fill();
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
			//setCanvas(canvasRef.current);
		},
		[
			width,
			height,
			setCanvas,
			setContext
		]
	);

	return (
		<div className="canvas-container">
			<canvas ref={canvasRef} onClick={(event) => handleClick(event.clientX, event.clientY)} className="canvas" />
		</div>
	);
};

export default Canvas;
