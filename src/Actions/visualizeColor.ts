const visualizeColor = (document: Document) => {
	let theme = document.documentElement.getAttribute('data-theme');
	let visualizeColor = '#6002ee';
	if (theme === 'dark') {
		visualizeColor = '#03dac5';
	}
	return visualizeColor;
};

export default visualizeColor;
