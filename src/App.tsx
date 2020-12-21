import React from 'react';
import { AdjacencyListContextProvider } from './Context/AdjacencyListContext';
import { Provider } from 'react-redux';
import { CanvasContextProvider } from './Context/CanvasContext';
import { SnackBarContextProvider } from './Context/SnackBarContext';
import './Styles/App.scss';
import './Styles/Variables.scss';
import Header from './Components/Header';
import Canvas from './Components/Canvas';
import configureStore from './Store/configureStore';
import VisualizeMenu from './Components/VisualizeMenu';
import SnackBar from './Components/SnackBar';

const App: React.FC = () => {
	const store = configureStore();
	return (
		<div className="App">
			<AdjacencyListContextProvider>
				<CanvasContextProvider>
					<Provider store={store}>
						<Header />
						<div className="container">
							<Canvas />
							<VisualizeMenu />
							<SnackBar />
						</div>
					</Provider>
				</CanvasContextProvider>
			</AdjacencyListContextProvider>
		</div>
	);
};

export default App;
