interface canvasProvider {
	canvas: HTMLCanvasElement | null;
	context: CanvasRenderingContext2D | null;
	setCanvas(canvas: HTMLCanvasElement | null): void;
	setContext(context: CanvasRenderingContext2D | null): void;
}

export default canvasProvider;
