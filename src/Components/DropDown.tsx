import React, { useState } from 'react';
import node from '../Types/Node';

type AppProps = {
	nodeList: node[];
	value: number;
	setNode(value: number): void;
};

const DropDown = ({ nodeList, value, setNode }: AppProps) => {
	const [
		open,
		setOpen
	] = useState<boolean>(false);
	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		setOpen(!open);
	};
	return (
		<div className="dropdown-container" onClick={handleClick}>
			<div className="dropdown-text">
				<p>Node {value}</p>
			</div>
			{
				open ? <div className="dropdown-item-container">
					{nodeList.map((item) => {
						if (item.value !== value) {
							return <div className="dropdown-item">Hello</div>;
						}
						else {
							return <React.Fragment />;
						}
					})}
				</div> :
				<React.Fragment />}
		</div>
	);
};

export default DropDown;
