import React from 'react';
import contextMenu from '../Types/contextMenu';

type AppProps = { contextmenu: contextMenu };

const ContextMenu = ({ contextmenu }: AppProps) => {
	const { isOpen, x, y } = contextmenu;
	let innerX = x;
	let innerY = y;
	if (x + 200 > window.innerWidth) {
		innerX = x - 200;
	}
	if (y + 300 > window.innerHeight) {
		innerY = y - 300;
	}

	return (
		<div className="context-menu" style={{ left: innerX, top: innerY, position: 'absolute' }}>
			<h3>Context Menu</h3>
		</div>
	);
};

export default ContextMenu;
