import React from 'react';
import './Styles/App.scss';
import Header from './Components/Header';
import Canvas from './Components/Canvas';
import { AdjacencyListContextProvider } from './Context/AdjacencyListContext';
import { CanvasContextProvider } from './Context/CanvasContext';
import VisualizeMenu from './Components/VisualizeMenu';

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
			<AdjacencyListContextProvider>
				<CanvasContextProvider>
					<Header />
					<div className="container">
						<Canvas />
						<VisualizeMenu />
					</div>
				</CanvasContextProvider>
			</AdjacencyListContextProvider>
		</div>
	);
};

export default App;
