import React from 'react';
import node from '../Types/Node';

type AppProps = {
	nodeList: node[];
	value: number;
	setNode(value: number): void;
};

const DropDown = ({ nodeList, value, setNode }: AppProps) => {
	return (
		<div className="dropdown-container">
			<ul className="dropdown-ul">
				{nodeList.map((item) => {
					if (item.value !== value) {
						return <li>Hi</li>;
					}
					else {
						return <React.Fragment />;
					}
				})}
			</ul>
		</div>
	);
};

export default DropDown;
