import React from 'react';
import './BasketItemInfo.css';

const BasketItemInfo = ({ item, basketItems, setBasketItems }) => {
	const handleRemoveItem = () => {
		const basket = basketItems.concat();
		const index = basket.indexOf(item);
		basket.splice(index, 1);
		setBasketItems(basket);
	};

	return (
		<div>
			<p>{item.name}</p>
			<p>£{item.price}</p>
			<img src={item.imageSrc} alt={item.name} />
			<button onClick={handleRemoveItem}>Remove</button>
		</div>
	);
};
export default BasketItemInfo;
