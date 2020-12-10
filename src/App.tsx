import React from 'react';
import './Styles/App.scss';
import Header from './Components/Header';
import Canvas from './Components/Canvas';

// const handleChange = (value: boolean): void => {
// 	if (value) {
// 		document.documentElement.setAttribute('data-theme', 'dark');
// 	}
// 	else {
// 		document.documentElement.setAttribute('data-theme', 'light');
// 	}
// };

const App: React.FC = () => {
	return (
		<div className="App">
			<Header />
			<div className="container">
				<Canvas />
			</div>
		</div>
	);
};

export default App;
