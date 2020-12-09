import React, { useEffect, useState } from 'react';
import Products from '../screens/Products';
import './ProductInfo.css';
import firebase from 'firebase/app';
import 'firebase/storage';

const ProductInfo = ({ product, basketItems, setBasketItems }) => {
	const [ imageSrc, setImageSrc ] = useState('');

	useEffect(() => {
		retrieveImage();
	}, []);

	const retrieveImage = () => {
		const imageRef = firebase.storage().ref(product.image);
		imageRef.getDownloadURL().then((imageURL) => {
			product.imageSrc = imageURL;
			setImageSrc(imageURL);
		});
	};
	const handleAddToBasket = () => {
		// const basket = basketItems.concat();
		// basket.push(product);
		// setBasketItems(basket);

		const basket = {...basketItems}
		if ( Object.keys(basket).includes(product.image)) {
			basket[product.image]["amount"] += 1
		} else {
			basket[product.image] = {"product": product, "amount": 1}
		}
		setBasketItems(basket);
	};

	return (
		<div className="product-container">
			<p>
				<b>Name:</b> {product.name}
			</p>
			<img src={imageSrc} alt="product" />
			<p>
				<b>Price:</b> £{product.price}
			</p>
			<p>
				<b>Description:</b> {product.description}
			</p>
			<p>
				<b>Manufacturer:</b> {product.manufacturer}
			</p>
			<p>
				<b>Stock:</b> {product['stock-level']}
			</p>
			<button onClick={handleAddToBasket}>Add to Basket</button>
		</div>
	);
};

export default ProductInfo;
