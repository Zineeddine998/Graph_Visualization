import React, { useState } from 'react';

interface Props {
	setWeight(weight: number): void;
	setWeightWindow(isOpen: boolean): void;
}

const Weight = ({ setWeight, setWeightWindow }: Props) => {
	const [
		value,
		setValue
	] = useState<number>(0);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setValue(+event.target.value);
	};

	const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setWeight(value);
		setWeightWindow(false);
	};

	return (
		<div className="weight-container">
			<form>
				<input type="text" onChange={handleInputChange}>
					{value}
				</input>
				<button onClick={handleSubmit} type="submit">
					Submit
				</button>
			</form>
		</div>
	);
};

export default Weight;
