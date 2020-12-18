import React from 'react';
import './Basket.css';
import BasketItemInfo from '../components/BasketItemInfo.js';
import firebase from 'firebase/app';
import db from '../firebaseConfig.js';

const Basket = ({ basketItems, setBasketItems }) => {
	const displayBasketItems = () => {
		// const basket = basketItems.map((item, index) => {
		// 	return <BasketItemInfo item={item} basketItems={basketItems} setBasketItems={setBasketItems} key={index} />;
		// });
		// return basket;
		const basket = Object.keys(basketItems).map((key, index) => {
			return (
				<BasketItemInfo
					item={basketItems[key]}
					basketItems={basketItems}
					setBasketItems={setBasketItems}
					key={index}
				/>
			);
		});
		return basket;
	};

	const getNumberOfItemsInBasket = () => {
		let basketSize = 0;
		for (const [ key, value ] of Object.entries(basketItems)) {
			basketSize += value.amount;
		}
		return basketSize;
	};

	const basketTotal = () => {
		// let total = 0;
		// basketItems.forEach((item) => {
		// 	total += item.price;
		// });
		// return total.toFixed(2);
		let total = 0;
		for (const [ key, value ] of Object.entries(basketItems)) {
			total += value.product.price * value.amount;
		}
		return total.toFixed(2);
	};

	const handleBuy = async () => {
		const batch = db.batch();
		let validBasket = true;
		for (const [ key, value ] of Object.entries(basketItems)) {
			const newStock = value.product['stock-level'] - value.amount;
			if (newStock < 0) {
				validBasket = false;
				alert(
					'Sorry there is only ' +
						value.product['stock-level'] +
						' of ' +
						value.product.name +
						' in stock. Please edit your basket and try again.'
				);
			} else {
				const productRef = db.collection('products').doc(value.product.id);
				batch.update(productRef, { 'stock-level': newStock });
			}
		}
		if (validBasket) {
			await batch.commit();
			setBasketItems({});
			alert('Purchase successful Thank You for your custom!');
		}
	};

	return (
		<div>
			<h1>Basket ({getNumberOfItemsInBasket()})</h1>
			<h4>Total: £{basketTotal()}</h4>
			{displayBasketItems()}
			<h4>Total: £{basketTotal()}</h4>
			<button onClick={() => handleBuy()}>Buy</button>
		</div>
	);
};
export default Basket;
