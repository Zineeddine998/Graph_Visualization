import React, { useState, useEffect, useContext, useRef } from 'react';
import { CanvasContext } from '../Context/CanvasContext';
import { AdjacencyListContext } from '../Context/AdjacencyListContext';
import node from '../Types/Node';
import contextMenu from '../Types/contextMenu';
import canvasProvider from '../Types/canvasProvider';
import adjacencyListProvider from '../Types/adjacencyListProvider';
import drawNode from '../Actions/drawNode';
import createNode from '../Actions/createNode';
import contextMenuState from '../Actions/contextMenuState';
import getNextIndex from '../Actions/getNextIndex';
import redrawCanvas from '../Actions/redrawCanvas';
import Newedge from './NewEdge';
import { ReactComponent as ArrowRight } from '../Icons/arrow_right.svg';
import edgeColor from '../Actions/edgeColor';

type AppProps = {
	contextmenu: contextMenu;
	setContextMenuState(state: boolean, x?: number, y?: number): void;
};

type DropdownMenu = {
	isOpen: boolean;
	directed?: boolean;
};

type position = {
	x: number;
	y: number;
};

type newEdgePosition = {
	x: number;
	edgeCase: boolean;
	y1: number;
	y2: number;
};

const ContextMenu = ({ contextmenu, setContextMenuState }: AppProps) => {
	const [
		newedge,
		setNewedge
	] = useState<DropdownMenu>({ isOpen: false });
	const [
		pos,
		setPos
	] = useState<position>({ x: 0, y: 0 });
	const [
		divpos,
		setDivpos
	] = useState<newEdgePosition>({ x: 0, edgeCase: false, y1: 0, y2: 0 });
	const [
		index,
		setIndex
	] = useState<number>(-1);
	const [
		result,
		setResult
	] = useState<boolean>(true);
	const firstDivElement = useRef<HTMLDivElement>(null);
	const secondDivElement = useRef<HTMLDivElement>(null);
	//eslint-disable-next-line
	const { x, y } = contextmenu;
	const { canvas, context } = useContext<canvasProvider>(CanvasContext);
	const { nodeList, edgeList, addNode, clearNodes, deleteNode } = useContext<adjacencyListProvider>(
		AdjacencyListContext
	);

	useEffect(
		() => {
			let innerX = x;
			let innerY = y;
			if (x + 200 > window.innerWidth) {
				innerX = x - 200;
			}
			if (y + 150 > window.innerHeight) {
				innerY = y - 100;
			}
			if (firstDivElement.current != null) {
				const rectOne = firstDivElement.current.getBoundingClientRect();
				const rectTwo = firstDivElement.current.getBoundingClientRect();
				let edgePos = false;
				let right = rectOne.right;
				let top = rectOne.top;
				let bottom = rectOne.bottom;
				if (rectOne.right + 200 > window.innerWidth) {
					right = right - 400;
				}
				if (rectOne.top + 200 > window.innerHeight) {
					top = window.innerHeight - rectTwo.top - 45;
					bottom = window.innerHeight - rectTwo.bottom - 45;
					edgePos = true;
				}
				console.log('top ', top);
				console.log('bottom ', bottom);
				setDivpos({ x: right, edgeCase: edgePos, y1: top, y2: bottom });
			}
			setPos({ x: innerX, y: innerY });
			setResult(contextMenuState(nodeList, x, y));
			if (result === false) {
				for (let iter of nodeList) {
					if (Math.abs(x - iter.clientX) < 20 && Math.abs(y - iter.clientY) < 20) {
						console.log(iter.value);
						setIndex(iter.value);
					}
				}
			}
		},
		[
			x,
			y,
			nodeList,
			index,
			result
		]
	);
	const setNewEdgeWrapper = (isOpen: boolean, directed: boolean = true): void => {
		const newEdge = { isOpen: isOpen, directed: directed };
		setNewedge(newEdge);
	};

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
				drawNode(nodeCount, context, xPos, yPos, '#ffffff');
				const newNode: node = createNode(nodeCount, xPos, yPos, x, y, rect.right, rect.bottom);
				addNode(newNode);
			}
			setContextMenuState(false);
		}
	};

	const handleClearCanvas = (event: React.FormEvent<HTMLDivElement>): void => {
		event.preventDefault();
		console.log('Clear Canvas');
		if (context && canvas) {
			context.clearRect(0, 0, canvas.width, canvas.height);
			clearNodes();
		}
		setContextMenuState(false);
	};

	const handleDeleteNode = (event: React.FormEvent<HTMLDivElement>): void => {
		event.preventDefault();
		deleteNode(x, y);
		redrawCanvas(nodeList, edgeList, canvas, context, edgeColor(document));
		setContextMenuState(false);
	};

	const handleMouseInDirected = (event: React.MouseEvent): void => {
		event.preventDefault();
		setNewEdgeWrapper(true, true);
	};

	const handleMouseInUndirected = (event: React.MouseEvent): void => {
		event.preventDefault();
		setNewEdgeWrapper(true, false);
	};

	const handleMouseOut = (event: React.MouseEvent): void => {
		event.preventDefault();
		setNewEdgeWrapper(false);
	};

	return (
		<div className="context-menu-container" onMouseLeave={handleMouseOut}>
			{
				newedge.isOpen ? <div
					className="context-menu context-menu-new-edge"
					style={

							divpos.edgeCase ? {
								left: divpos.x,
								bottom:
									newedge.directed ? divpos.y1 :
									divpos.y2,
								position: 'absolute'
							} :
							{
								left: divpos.x,
								top:
									newedge.directed ? divpos.y1 :
									divpos.y2,
								position: 'absolute'
							}
					}
				>
					{nodeList.map((value: node) => {
						if (value.value !== index && newedge.directed !== undefined) {
							return (
								<Newedge
									key={value.value}
									source={index}
									target={value.value}
									directed={newedge.directed}
								/>
							);
						}
						return null;
					})}
				</div> :
				<React.Fragment />}
			<div
				className="context-menu"
				style={{ left: pos.x, top: pos.y, position: 'absolute' }}
				onContextMenu={handleRightClick}
			>
				{
					result ? <div>
						<div className="context-menu-option" onClick={handleAddNode}>
							<span className="context-menu-text">Add Node</span>
						</div>
						<div className="context-menu-option" onClick={handleClearCanvas}>
							<span className="context-menu-text">Clear Nodes</span>
						</div>
					</div> :
					<div>
						<div className="context-menu-option" onClick={handleDeleteNode}>
							<span className="context-menu-text">Delete Node</span>
						</div>
						<div
							className="context-menu-option context-menu-arrow"
							ref={firstDivElement}
							onMouseEnter={handleMouseInDirected}
						>
							<span className="context-menu-arrow-text context-menu-text">Add Direceted Edge</span>
							<ArrowRight className="context-menu-arrow-head" />
						</div>
						<div
							className="context-menu-option context-menu-arrow"
							ref={secondDivElement}
							onMouseEnter={handleMouseInUndirected}
						>
							<span className="context-menu-arrow-text context-menu-text">Add Undireceted Edge</span>
							<ArrowRight className="context-menu-arrow-head" />
						</div>
					</div>}
			</div>
		</div>
	);
};

export default ContextMenu;
