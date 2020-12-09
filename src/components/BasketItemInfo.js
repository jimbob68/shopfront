import React from 'react';
import './BasketItemInfo.css';

const BasketItemInfo = ({ item, basketItems, setBasketItems }) => {

	const handleRemoveAllItem = () => {
	// 	const basket = basketItems.concat();
	// 	const index = basket.indexOf(item);
	// 	basket.splice(index, 1);
	// 	setBasketItems(basket);

	const basket = {...basketItems}
	delete basket[item.product.image]
	setBasketItems(basket)
	};

	const handleAddOneItem = () => {
		const basket = {...basketItems}
		basket[item.product.image]["amount"] += 1 
		setBasketItems(basket)
	}

	const handleRemoveOneItem = () => {
		const basket = {...basketItems}
		if (basket[item.product.image]["amount"] === 1) {
			delete basket[item.product.image]
		} else {
			basket[item.product.image]["amount"] -= 1
		}
		setBasketItems(basket)
	}

	const showNumberOfItem = () => {
		let itemAmount = ""
		if ( item.amount > 1) {
			itemAmount = "x " + item.amount + " = £" + (item.amount * item.product.price).toFixed(2)
		}
		return itemAmount
	}

	return (
		<div>
			<p>{item.product.name}</p>
			<p>£{item.product.price} {showNumberOfItem()}</p>
			<img src={item.product.imageSrc} alt={item.product.name} />
			<button onClick={handleAddOneItem}>Add one</button>
			<button onClick={handleRemoveOneItem}>Remove One</button>
			<button onClick={handleRemoveAllItem}>Remove all</button>
		</div>
	);
};
export default BasketItemInfo;
