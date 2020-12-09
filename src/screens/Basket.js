import React from 'react';
import './Basket.css';
import BasketItemInfo from '../components/BasketItemInfo.js';

const Basket = ({ basketItems, setBasketItems }) => {
	const displayBasketItems = () => {
		const basket = basketItems.map((item, index) => {
			return <BasketItemInfo item={item} basketItems={basketItems} setBasketItems={setBasketItems} key={index} />;
		});
		return basket;
	};
	const basketTotal = () => {
		let total = 0;
		basketItems.forEach((item) => {
			total += item.price;
		});
		return total;
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
