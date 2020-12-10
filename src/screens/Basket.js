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
			<p>Basket</p>
			{displayBasketItems()}
			<p>Total: £{basketTotal()}</p>
		</div>
	);
};
export default Basket;
