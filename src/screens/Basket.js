import React from 'react';
import './Basket.css';
import BasketItemInfo from '../components/BasketItemInfo.js';
import db from '../firebaseConfig.js';

const Basket = ({ basketItems, setBasketItems }) => {
	const displayBasketItems = () => {
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
		let total = 0;
		for (const [ key, value ] of Object.entries(basketItems)) {
			total += value.product.price * value.amount;
		}
		return total.toFixed(2);
	};

	const handleBuy = async () => {
		if (Object.entries(basketItems).length === 0) {
			alert('Please add a product to your basket');
		} else {
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
		}
	};

	return (
		<div>
			<h1>Basket ({getNumberOfItemsInBasket()})</h1>
			<h4>Total: £{basketTotal()}</h4>
			{displayBasketItems()}
			<h4>Total: £{basketTotal()}</h4>
			<button className="buy-button" onClick={() => handleBuy()}>
				Buy
			</button>
		</div>
	);
};
export default Basket;
