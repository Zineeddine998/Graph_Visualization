import React from 'react';

export const DownArrow = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="24px" height="24px">
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
		</svg>
	);
};

export const UpArrow = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="24px" height="24px">
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
		</svg>
	);
};

export const CloseIcon = () => {
	return (
		<div className="snackbar-close-icon">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="24px" height="24px">
				<path d="M0 0h24v24H0z" fill="none" />
				<path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
			</svg>
		</div>
	);
};
