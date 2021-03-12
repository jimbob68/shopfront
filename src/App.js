import React, { useState } from 'react';
import './App.css';
import Home from './screens/Home.js';
import NavBar from './components/NavBar.js';
import Footer from './components/Footer.js';
import Products from './screens/Products.js';
import AboutUs from './screens/AboutUs.js';
import Basket from './screens/Basket.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
	const [ basketItems, setBasketItems ] = useState({});
	const [ pageNumber, setPageNumber ] = useState(1);

	return (
		<div className="App">
			<div className="content-wrapper">
				<Router>
					<NavBar basketItems={basketItems} setPageNumber={setPageNumber} />
					<Route exact path="/" component={Home} />
					<Route
						exact
						path="/products"
						render={() => <Products 
							setBasketItems={setBasketItems} 
							basketItems={basketItems}
							pageNumber={pageNumber}
							setPageNumber={setPageNumber} />}
					/>
					<Route path="/about-us" component={AboutUs} />
					<Route
						path="/basket"
						render={() => <Basket basketItems={basketItems} setBasketItems={setBasketItems} />}
					/>
					<Footer />
				</Router>
			</div>
		</div>
	);
};

export default App;
