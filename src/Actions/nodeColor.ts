const nodeColor = (document: Document): string => {
	let theme = document.documentElement.getAttribute('data-theme');
	let nodeColor = '#eeeeee';
	if (theme === 'dark') {
		nodeColor = '#eeeeee';
	}
	return nodeColor;
};

export default nodeColor;
