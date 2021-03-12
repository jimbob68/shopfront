import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './screens/Home.js';
import NavBar from './components/NavBar.js';
import Footer from './components/Footer.js';
import Products from './screens/Products.js';
import AboutUs from './screens/AboutUs.js';
import Basket from './screens/Basket.js';
import firebase from 'firebase/app';
import 'firebase/storage';
import db from './firebaseConfig.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
	const [ products, setProducts ] = useState([]);
	const [ productsToDisplay, setProductsToDisplay ] = useState([]);
	const [ pageNumber, setPageNumber ] = useState(1);
	const [ basketItems, setBasketItems ] = useState({});

	useEffect(() => {
		retrieveProducts();
	}, []);

	const retrieveProducts = async () => {
		const productsRef = db.collection('products');
		const productsData = await productsRef.get();
		setProducts(productsData.docs.map((doc) => doc.data()));
		setProductsToDisplay(productsData.docs.map((doc) => doc.data()));
	};

	return (
		<div className="App">
			<div className="content-wrapper">
				<Router>
					<NavBar
						basketItems={basketItems}
						setPageNumber={setPageNumber}
						setProductsToDisplay={setProductsToDisplay}
						products={products}
					/>
					<Route exact path="/" component={Home} />
					<Route
						exact
						path="/products"
						render={() => (
							<Products
								setBasketItems={setBasketItems}
								basketItems={basketItems}
								products={products}
								setProducts={setProducts}
								productsToDisplay={productsToDisplay}
								setProductsToDisplay={setProductsToDisplay}
								pageNumber={pageNumber}
								setPageNumber={setPageNumber}
							/>
						)}
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
