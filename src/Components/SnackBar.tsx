import React, { useContext } from 'react';
import '../Styles/SnackBar.scss';
import { SnackBarContext } from '../Context/SnackBarContext';
import snackbarProvider from '../Types/snackbarProvider';
import { ReactComponent as CloseIcon } from '../Icons/CloseIcon.svg';

const SnackBar = () => {
	const { open, message, toggleSnackbar } = useContext<snackbarProvider>(SnackBarContext);

	return (
		<div>
			{
				open ? <div className="snackbar-container">
					<p className="snackbar-text">{message}</p>
					<CloseIcon className="snackbar-close-icon" onClick={() => toggleSnackbar()} />
				</div> :
				<React.Fragment />}
		</div>
	);
};

export default SnackBar;
