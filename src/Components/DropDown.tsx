import React, { useState } from 'react';
import node from '../Types/Node';
import { DownArrow, UpArrow } from '../Icons/Icons';

type AppProps = {
	nodeList: node[];
	value: number;
	setNode(value: number): void;
};

const DropDown = ({ nodeList, value, setNode }: AppProps) => {
	const [ open, setOpen ] = useState<boolean>(false);
	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		setOpen(!open);
	};
	const handleChangeNode = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
		event.preventDefault();
		setOpen(!open);
		setNode(index);
	};
	return (
		<div className="dropdown-container" onClick={handleClick}>
			<div className="dropdown-text-container">
				<div className="dropdown-text"> Node {value} </div>
				<div className="dropdown-arrow">
					{
						open ? <UpArrow /> :
						<DownArrow />}
				</div>
			</div>
			{
				open ? <div className="dropdown-item-container">
					{
						nodeList.length <= 1 ? <div className="dropdown-item"> Nodes Unavailables </div> :
						nodeList.map((item) => {
							if (item.value !== value) {
								return (
									<div
										key={item.value}
										className="dropdown-item"
										onClick={(event) => handleChangeNode(event, item.value)}
									>
										Node {item.value}
									</div>
								);
							}
							else {
								return <React.Fragment key={item.value} />;
							}
						})}
				</div> :
				<React.Fragment />}
		</div>
	);
};

export default DropDown;
