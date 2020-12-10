import './App.scss';

function App (){
	const handleChange = (value: boolean): void => {
		if (value) {
			document.documentElement.setAttribute('data-theme', 'dark');
		}
		else {
			document.documentElement.setAttribute('data-theme', 'light');
		}
	};

	return (
		<div className="App">
			<input
				type="checkbox"
				onClick={(event) => {
					handleChange((event.target as HTMLInputElement).checked);
				}}
			/>
		</div>
	);
}

export default App;
