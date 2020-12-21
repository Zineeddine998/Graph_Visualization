import React from 'react';
import { render } from '@testing-library/react';
import Canvas from '../Components/Canvas';
import drawNode from '../Acctions/drawNode';

let canvas;
let ctx;

beforeEach(() => {
	const { queryByTestId } = render(<Canvas />);
	canvas = queryByTestId('canvas-element');
	ctx = canvas.getContext('2d');
});

test('renders canvas', () => {
	expect(canvas).toBeInTheDocument();
	expect(ctx).not.toBeNull();
});

test('draw in canvas', () => {
	if (ctx) {
		drawNode(1, ctx, 100, 100, '#eeeeee');
		drawNode(2, ctx, 200, 100, '#eeeeee');
		drawNode(3, ctx, 300, 100, '#eeeeee');
		const path = ctx.__getPath();
		// eslint-disable-next-line jest/no-conditional-expect
		expect(path).toMatchSnapshot();
	}
});
