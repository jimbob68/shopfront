import React from 'react';
import './Basket.css';
import BasketItemInfo from '../components/BasketItemInfo.js';

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
	return (
		<div>
			<h1>Basket ({getNumberOfItemsInBasket()})</h1>
			<h4>Total: £{basketTotal()}</h4>
			{displayBasketItems()}
			<h4>Total: £{basketTotal()}</h4>
		</div>
	);
};
export default Basket;
