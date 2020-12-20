import { configureStore } from '@reduxjs/toolkit';
import adjacencyListReducer from './adjacencyList';
import canvasReducer from './canvas';
import snackbarReducer from './snackbar';

const configureStoreUtils = () =>
	configureStore({
		reducer: {
			adjacencyList: adjacencyListReducer,
			canvas: canvasReducer,
			snackbar: snackbarReducer
		}
	});

export default configureStoreUtils;
