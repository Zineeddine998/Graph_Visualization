import React, { useContext } from 'react';
import '../Styles/SnackBar.scss';
import { SnackBarContext } from '../Context/SnackBarContext';
import snackbarProvider from '../Types/snackbarProvider';
import { ReactComponent as CloseIcon } from '../Icons/CloseIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_MESSAGE, getSnackbarStateReducer, getSnackbarMessageReducer } from '../Store/snackbar';

const SnackBar = () => {
	const dispatch = useDispatch();
	const open = useSelector(getSnackbarStateReducer);
	const message = useSelector(getSnackbarMessageReducer);

	return (
		<div>
			{
				open ? <div className="snackbar-container">
					<p className="snackbar-text">{message}</p>
					<CloseIcon className="snackbar-close-icon" onClick={() => dispatch(CLEAR_MESSAGE())} />
				</div> :
				<React.Fragment />}
		</div>
	);
};

export default SnackBar;
