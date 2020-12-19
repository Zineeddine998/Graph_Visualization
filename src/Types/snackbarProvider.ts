interface snackbarProvider {
	open: boolean;
	message: string;
	toggleSnackbar(message?: string): void;
}

export default snackbarProvider;
