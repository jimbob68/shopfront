import React, { useEffect, useState } from 'react';
import './Products.css';
import ProductInfo from '../components/ProductInfo.js';
import firebase from 'firebase/app';
import 'firebase/storage';
import db from '../firebaseConfig.js';

const Products = ({ setBasketItems, basketItems }) => {
	const [ products, setProducts ] = useState([]);

	useEffect(() => {
		retrieveProducts();
	}, []);

	const retrieveProducts = async () => {
		const productsRef = db.collection('products');
		const productsData = await productsRef.get();
		setProducts(productsData.docs.map((doc) => doc.data()));
	};

	const displayProductsInfo = () => {
		return products.map((product) => (
			<ProductInfo
				setBasketItems={setBasketItems}
				basketItems={basketItems}
				product={product}
				key={product.image}
			/>
		));
	};

	return (
		<div>
			<h1>Products</h1>
			{/* {products && displayProductsInfo()} */}
			{displayProductsInfo()}
		</div>
	);
};
export default Products;
