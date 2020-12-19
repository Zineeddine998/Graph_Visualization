const edgeColor = (document: Document): string => {
	let theme = document.documentElement.getAttribute('data-theme');
	let edgeColor = '#333333';
	if (theme === 'dark') {
		edgeColor = '#eeeeee';
	}
	return edgeColor;
};

export default edgeColor;
