import React, { useEffect, useState } from 'react';
import Products from '../screens/Products';
import './ProductInfo.css';
import firebase from 'firebase/app';
import 'firebase/storage';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const ProductInfo = ({ product, basketItems, setBasketItems }) => {
	const [ imageSrc, setImageSrc ] = useState('');
	const [ modalIsOpen, setModalIsOpen ] = useState(false)

	useEffect(
		() => {
			retrieveImage();
		},
		[ product ]
	);

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

		// Using product.image as a unique identifier
		const basket = { ...basketItems };
		if (Object.keys(basket).includes(product.image)) {
			basket[product.image]['amount'] += 1;
		} else {
			basket[product.image] = { product: product, amount: 1 };
		}
		setBasketItems(basket);
	};

	return (
		<div className="product-container">
			<div>
				<img src={imageSrc} alt="product" />
			</div>
			<div>
				<p>
					<b>Name:</b> {product.name}
				</p>

				<p>
					<b>Price:</b> £{product.price}
				</p>
				<button onClick={() => setModalIsOpen(true)}>More Info</button>
				<button className="add-to-basket-button" onClick={handleAddToBasket}>
					Add to Basket
				</button>
			</div>
			<Modal isOpen={modalIsOpen} >
				<button onClick={() => setModalIsOpen(false)}>Close</button>
				<div>
					<img src={imageSrc} alt="product" />
				</div>
				<div>
					<p>
						<b>Name:</b> {product.name}
					</p>

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
					<button className="add-to-basket-button" onClick={handleAddToBasket}>
						Add to Basket
					</button>
				</div>
			</Modal>
		</div>
	);
};

export default ProductInfo;
