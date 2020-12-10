import React from 'react';
import './BasketItemInfo.css';

const BasketItemInfo = ({ item, basketItems, setBasketItems }) => {
	const handleRemoveItem = () => {
		// const basket = basketItems.concat();
		// const index = basket.indexOf(item);
		// basket.splice(index, 1);
		// setBasketItems(basket);
		const basket = { ...basketItems };
		delete basket[item.product.image];
		setBasketItems(basket);
	};

	const showNumberOfItems = () => {
		let itemAmount = '';
		if (item.amount > 1) {
			itemAmount = 'x ' + item.amount + ' = £' + (item.amount * item.product.price).toFixed(2);
		}
		return itemAmount;
	};

	const handleRemoveOneItem = () => {
		const basket = { ...basketItems };
		if (basket[item.product.image]['amount'] === 1) {
			delete basket[item.product.image];
		} else {
			basket[item.product.image]['amount'] -= 1;
		}
		setBasketItems(basket);
	};

	const handleAddOneItem = () => {
		const basket = { ...basketItems };
		basket[item.product.image]['amount'] += 1;
		setBasketItems(basket);
	};

	return (
		<div>
			<p>{item.product.name}</p>
			<p>
				£{item.product.price} {showNumberOfItems()}
			</p>
			<img src={item.product.imageSrc} alt={item.product.name} />
			<button onClick={handleRemoveItem}>Remove All</button>
			<button onClick={handleRemoveOneItem}>Remove 1</button>
			<button onClick={handleAddOneItem}>Add 1</button>
		</div>
	);
};
export default BasketItemInfo;
