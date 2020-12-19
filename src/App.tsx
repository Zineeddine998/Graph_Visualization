import React from 'react';
import { AdjacencyListContextProvider } from './Context/AdjacencyListContext';
import { CanvasContextProvider } from './Context/CanvasContext';
import { SnackBarContextProvider } from './Context/SnackBarContext';
import './Styles/App.scss';
import './Styles/Variables.scss';
import Header from './Components/Header';
import Canvas from './Components/Canvas';
import VisualizeMenu from './Components/VisualizeMenu';
import SnackBar from './Components/SnackBar';

const App: React.FC = () => {
	return (
		<div className="App">
			<AdjacencyListContextProvider>
				<CanvasContextProvider>
					<SnackBarContextProvider>
						<Header />
						<div className="container">
							<Canvas />
							<VisualizeMenu />
							<SnackBar />
						</div>
					</SnackBarContextProvider>
				</CanvasContextProvider>
			</AdjacencyListContextProvider>
		</div>
	);
};

export default App;
