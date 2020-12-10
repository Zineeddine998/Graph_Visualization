import React, { useState, ReactNode, createContext } from 'react';
import canvasProvider from '../Types/canvasProvider';

const initialState = {
	canvas: null,
	context: null,
	setCanvas: (canvas: HTMLCanvasElement | null) => {},
	setContext: (context: CanvasRenderingContext2D | null) => {}
};

export const CanvasContext = createContext<canvasProvider>(initialState);

type IProps = {
	children: ReactNode;
};

export const CanvasContextProvider = (props: IProps) => {
	const [
		canvas,
		setCanvas
	] = useState<HTMLCanvasElement | null>(null);
	const [
		context,
		setContext
	] = useState<CanvasRenderingContext2D | null>(null);

	return (
		<CanvasContext.Provider value={{ canvas, context, setCanvas, setContext }}>
			{props.children}
		</CanvasContext.Provider>
	);
};
