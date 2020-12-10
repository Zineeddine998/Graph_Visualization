import React, { useState, useEffect, useRef } from 'react';

const Canvas = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [
		canvas,
		setCanvas
	] = useState<HTMLCanvasElement | null>(null);
	const handleClick = (clientX: number, clientY: number): void => {
		if (canvas) {
			const rect = canvas.getBoundingClientRect();
			const x = clientX - rect.left;
			const y = clientY - rect.top;
			console.log('x: ' + x + 'y: ' + y);
		}
	};

	useEffect(() => {
		setCanvas(canvasRef.current);
	}, []);

	return (
		<div className="canvas-container">
			<canvas ref={canvasRef} onClick={(event) => handleClick(event.clientX, event.clientY)} className="canvas" />
		</div>
	);
};

export default Canvas;
