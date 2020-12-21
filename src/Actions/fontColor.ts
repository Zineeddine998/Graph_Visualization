const fontColor = (document: Document): string => {
	const theme = document.documentElement.getAttribute('data-theme');
	if (theme === 'dark') {
		return 'white';
	}
	else return 'black';
};

export default fontColor;
