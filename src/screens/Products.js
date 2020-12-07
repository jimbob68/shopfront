import React, { useEffect, useState } from 'react';
import './Products.css';
import firebase from 'firebase/app';
import db from '../firebaseConfig.js';

const Products = () => {
	const [ products, setProducts ] = useState([]);

	useEffect(() => {
		retrieveProducts();
	});

	const retrieveProducts = async () => {
		const productRef = db.collection('products').doc('HKoA7R3vTQXzvMk8DvOV');
		const doc = await productRef.get();
		setProducts(doc.data());
	};
	return <p>Products</p>;
};
export default Products;
