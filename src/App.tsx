import React from 'react';
import { AdjacencyListContextProvider } from './Context/AdjacencyListContext';
import { CanvasContextProvider } from './Context/CanvasContext';
import './Styles/App.scss';
import Header from './Components/Header';
import Canvas from './Components/Canvas';
import VisualizeMenu from './Components/VisualizeMenu';

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
