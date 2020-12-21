import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SliceState = {
	open: boolean;
	message: string;
};

const initialState: SliceState = {
	open: false,
	message: ''
};

const snackbarSlice = createSlice({
	name: 'snackbar',
	initialState,
	reducers: {
		CLEAR_MESSAGE: () => {
			return {
				open: false,
				message: ''
			};
		},
		SET_MESSAGE: (state, action: PayloadAction<string>) => {
			return {
				open: true,
				message: action.payload
			};
		}
	}
});
export const getSnackbarStateReducer = (state: { snackbar: SliceState }) => state.snackbar.open;
export const getSnackbarMessageReducer = (state: { snackbar: SliceState }) => state.snackbar.message;

export const { CLEAR_MESSAGE, SET_MESSAGE } = snackbarSlice.actions;

export default snackbarSlice.reducer;
