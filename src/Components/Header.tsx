import React from 'react';
import '../Styles/Header.scss';

const Header = () => {
	// const transform = () => {
	// 	return null;
	// };
	const handleChange = (value: boolean): void => {
		console.log('testing the header component');
		if (value) {
			transform();
			document.documentElement.setAttribute('data-theme', 'dark');
		}
		else {
			transform();
			document.documentElement.setAttribute('data-theme', 'light');
		}
	};

	let transform = () => {
		document.documentElement.classList.add('transition');
		window.setTimeout(() => {
			document.documentElement.classList.remove('transition');
		}, 1000);
	};

	return (
		<header className="header">
			<h4 className="header-text">Graph Visualisation</h4>
			<div className="toggle-container">
				<input
					type="checkbox"
					id="swtich"
					className="toggle-switch"
					onClick={(event) => {
						handleChange((event.target as HTMLInputElement).checked);
					}}
				/>
				<label htmlFor="swtich" className="toggle-label">
					Switch
				</label>
			</div>
		</header>
	);
};

export default Header;
