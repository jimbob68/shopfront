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
		<div className="basket-item-container">
			<div className="basket-detail-wrapper">
				<img src={item.product.imageSrc} alt={item.product.name} />
				<div>
					<h4>
						<b>
							{item.product.name} ( x {item.amount})
						</b>
					</h4>
					{/* <p>
						£{item.product.price} {showNumberOfItems()}
					</p> */}
					<p>Product Price: £{item.product.price}</p>
					<p>Total Items Price: £{(item.product.price * item.amount).toFixed(2)}</p>

					<button className="basket-button" onClick={handleAddOneItem}>
						Add 1
					</button>
					<button className="basket-button" onClick={handleRemoveOneItem}>
						Remove 1
					</button>
					<button className="basket-button" onClick={handleRemoveItem}>
						Remove All
					</button>
				</div>
			</div>
		</div>
	);
};
export default BasketItemInfo;
