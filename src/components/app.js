import React from 'react';
import SearchBar from '../components/search-bar';
import ForecastList from '../components/forecast-list';


const App = () => {
	return (
		<div className="container">
			<SearchBar />
			<ForecastList />
		</div>
	);
}

export default App;
