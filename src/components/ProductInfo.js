import React, { useEffect, useState } from 'react';
import './ProductInfo.css';
import firebase from 'firebase/app';
import 'firebase/storage';
import Modal from 'react-modal';

const ProductInfo = ({ product, basketItems, setBasketItems }) => {
	const [ imageSrc, setImageSrc ] = useState('');
	const [ modalIsOpen, setModalIsOpen ] = useState(false);
	const [ itemCounter, setItemCounter ] = useState(0);

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
		// Using product.image as a unique identifier
		if (product['stock-level'] > 0) {
			if (product['stock-level'] > itemCounter) {
				const basket = { ...basketItems };
				if (Object.keys(basket).includes(product.image)) {
					basket[product.image]['amount'] += 1;
				} else {
					basket[product.image] = { product: product, amount: 1 };
				}
				setBasketItems(basket);
				setItemCounter(itemCounter + 1);
			} else {
				alert('Sorry, we do not have any more of this item available at this time.');
			}
		} else {
			alert('Sorry, this item is currently out of stock.');
		}
	};

	return (
		<div className="product-container">
			<div>
				<img className="product-image" src={imageSrc} alt="product" />
			</div>
			<div>
				<p>
					<b>{product.name}</b>
				</p>

				<p>£{product.price}</p>
				<button className="product-more-info-button" onClick={() => setModalIsOpen(true)}>
					More Info
				</button>
				<button className="add-to-basket-button" onClick={handleAddToBasket}>
					Add to Basket
				</button>
			</div>
			<Modal
				className="modal-container"
				appElement={document.getElementById('root')}
				isOpen={modalIsOpen}
				style={{
					overlay: {
						backgroundColor: 'rgba(0,0,0,0.7)'
					}
				}}
			>
				<button className="modal-close-button" onClick={() => setModalIsOpen(false)}>
					Close
				</button>
				<div className="modal-top-container">
					<img className="product-image" src={imageSrc} alt="product" />
					<div className="modal-top-container-detail">
						<p>
							<b>Name:</b> {product.name}
						</p>

						<p>
							<b>Price:</b> £{product.price}
						</p>
						<p>
							<b>Manufacturer:</b> {product.manufacturer}
						</p>
						<p>
							<b>Stock:</b> {product['stock-level']}
						</p>
					</div>
				</div>
				<p>
					<b>Description:</b> {product.description}
				</p>
				<button className="modal-add-to-basket-button" onClick={handleAddToBasket}>
					Add to Basket
				</button>
			</Modal>
		</div>
	);
};

export default ProductInfo;
