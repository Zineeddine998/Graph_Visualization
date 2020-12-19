import React, { useState } from 'react';
import { NumberLiteralType } from 'typescript';
import { DownArrow, UpArrow } from '../Icons/Icons';

type AppProps = {
	algoList: string[];
	value: number;
	setAlgo(value: number): void;
};

const DropDownUtils = ({ algoList, value, setAlgo }: AppProps) => {
	const [
		open,
		setOpen
	] = useState<boolean>(false);

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		setOpen(!open);
	};

	const handleChangeNode = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
		event.preventDefault();
		setOpen(!open);
		setAlgo(index);
	};

	return (
		<div className="algorithm-dropdown-container" onClick={handleClick}>
			{' '}
			{
				open ? <div className="algorithm-dropdown-item-container">
					{algoList.map((item) => {
						return (
							<div
								className="algorithm-dropdown-item"
								onClick={(event) => handleChangeNode(event, algoList.indexOf(item))}
							>
								{item}
							</div>
						);
					})}
				</div> :
				<React.Fragment />}
			<div className="algorithm-dropdown-text-container">
				<div className="algorithm-dropdown-text">{algoList[value]}</div>
				<div className="algorithm-dropdown-arrow">
					{' '}
					{
						open ? <UpArrow /> :
						<DownArrow />}
				</div>
			</div>
		</div>
	);
};

export default DropDownUtils;
