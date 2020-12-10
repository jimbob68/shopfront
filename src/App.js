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
	return (
		<div className="App">
			<Router>
				<NavBar basketItems={basketItems} />
				<Route exact path="/" component={Home} />
				<Route
					exact
					path="/products"
					render={() => <Products setBasketItems={setBasketItems} basketItems={basketItems} />}
				/>
				<Route path="/about-us" component={AboutUs} />
				<Route
					path="/basket"
					render={() => <Basket basketItems={basketItems} setBasketItems={setBasketItems} />}
				/>
				<Footer />
			</Router>
		</div>
	);
};

export default App;
