import React, { useEffect, useState } from 'react';
import './Products.css';
import firebase from 'firebase/app';
import 'firebase/storage';
// import * as firebase from 'firebase';
import db from '../firebaseConfig.js';

const Products = () => {
	const [ products, setProducts ] = useState([]);
	const [ productImage, setProductImage ] = useState('');

	useEffect(() => {
		retrieveProducts();
	}, []);

	const retrieveProducts = async () => {
		const productRef = db.collection('products').doc('HKoA7R3vTQXzvMk8DvOV');
		const doc = await productRef.get();
		setProducts(doc.data());
		const imageRef = firebase.storage().ref(doc.data().image);
		imageRef.getDownloadURL().then((imageUrl) => {
			setProductImage(imageUrl);
		});
	};
	return (
		<div>
			<h1>Products</h1>

			<p>Name: {products.name}</p>
			<img src={productImage} alt="product" />
			<p>Price: £{products.price}</p>
			<p>Description: {products.description}</p>
		</div>
	);
};
export default Products;
