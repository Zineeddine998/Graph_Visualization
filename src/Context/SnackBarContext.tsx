import React, { useState, ReactNode, createContext } from 'react';
import snackbarProvider from '../Types/snackbarProvider';

const initialState = {
	open: false,
	message: '',
	toggleSnackbar: (message: string = '') => {}
};

export const SnackBarContext = createContext<snackbarProvider>(initialState);

type Iprops = {
	children: ReactNode;
};

export const SnackBarContextProvider = (props: Iprops) => {
	const [
		open,
		setOpen
	] = useState<boolean>(false);
	const [
		message,
		setMessage
	] = useState<string>('');

	const toggleSnackbar = (message: string = '') => {
		if (message.length < 1) {
			setOpen(false);
			setMessage('');
		}
		else {
			setOpen(true);
			setMessage(message);
		}
	};

	return (
		<SnackBarContext.Provider value={{ open, message, toggleSnackbar }}>{props.children}</SnackBarContext.Provider>
	);
};
