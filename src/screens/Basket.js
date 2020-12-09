import React from 'react';
import './Basket.css';

const Basket = ({ basketItems, setBasketItems }) => {
	const displayBasketItems = () => {
		const basket = basketItems.map((item) => {
			return <p>{item.name}</p>;
		});
		return basket;
	};
	return (
		<div>
			<p>Basket</p>
			{displayBasketItems()}
		</div>
	);
};
export default Basket;
