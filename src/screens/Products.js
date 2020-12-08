import React, { useEffect, useState } from 'react';
import './Products.css';
import firebase from 'firebase/app';
import 'firebase/storage';
// import * as firebase from 'firebase';
import db from '../firebaseConfig.js';

const Products = () => {
	const [ products, setProducts ] = useState([]);
	const [ productImages, setProductImages ] = useState([]);

	useEffect(() => {
		retrieveProducts();
	}, []);

	const retrieveProducts = async () => {
		const productsRef = db.collection('products');
		const productsData = await productsRef.get();
		console.log('productsData', productsData);
		// setProducts(
		// 	productsData.docs.map((doc) => {
		// 		const data = doc.data();
		// 		retrieveImage(data);
		// 		// const imageRef = await firebase.storage().ref(doc.data().image);
		// 		// imageRef.getDownloadURL().then((imageURL) => {
		// 		// 	data.image = imageURL;
		// 		// 	console.log('imageURL', imageURL);
		// 		// });
		// 		console.log('data', data);
		// 		return data;
		// 	})
		// );

		const allProductsData = productsData.docs.map((doc) => {
			// const data = doc.data();
			// retrieveImage(data);
			// const imageRef = await firebase.storage().ref(doc.data().image);
			// imageRef.getDownloadURL().then((imageURL) => {
			// 	data.image = imageURL;
			// 	console.log('imageURL', imageURL);
			// });
			// console.log('data', data);
			return doc.data();
		});
		console.log('ALLproductsData', allProductsData);

		allProductsData.forEach((product) => {
			const imageRef = firebase.storage().ref(product.image);
			imageRef.getDownloadURL().then((imageURL) => {
				product.image = imageURL;
				// console.log('imageURL', imageURL);
			});
			// .then(setProducts(products.push(product.image)));
		});
		console.log('ALLproductsData2', allProductsData);
		setProducts(allProductsData);

		// const imageRef = firebase.storage().ref(doc.data().image);
		// imageRef.getDownloadURL().then((imageUrl) => {
		// 	setProductImage(imageUrl);
		// });
	};
	const retrieveImage = (data) => {
		const imageRef = firebase.storage().ref(data.image);
		imageRef.getDownloadURL().then((imageURL) => {
			const temporaryProductImages = productImages.slice();
			temporaryProductImages.push(imageURL);
			setProductImages(temporaryProductImages);
			console.log('imageURL', imageURL);
		});
		return data;
	};
	const displayProductsInfo = () => {
		console.log('products!!!!!!', products[0]);
		const productsInfo = products.map((product) => {
			console.log('IMAGE!!!!!', product.image);
			// let productImage;
			// const imageRef = firebase.storage().ref(product.image);
			// imageRef.getDownloadURL().then((imageURL) => {
			// 	productImage = imageURL;
			// 	console.log('imageURL', imageURL);
			// });
			return (
				<div>
					<p>Name: {product.name}</p>
					{console.log('product', product.image)}
					<img src={product.image} alt="product" />
					<p>Price: £{product.price}</p>
					<p>Description: {product.description}</p>
				</div>
			);
		});
		return productsInfo;
	};
	return (
		<div>
			<h1>Products</h1>
			{products && displayProductsInfo()}
			{/* <p>Name: {products.name}</p>
			<img src={productImage} alt="product" />
			<p>Price: £{products.price}</p>
			<p>Description: {products.description}</p> */}
		</div>
	);
};
export default Products;
