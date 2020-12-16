import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

const NavBar = ({ basketItems }) => {
	const displayNumberOfItems = () => {
		let numberOfItems = 0;
		for (const [ key, value ] of Object.entries(basketItems)) {
			numberOfItems += value.amount;
		}
		return '(' + numberOfItems + ')';
	};

	return (
		<div className="nav-bar">
			<h1 className="nav-bar-shop-title">Chrimbo Land</h1>
			<ul>
				<li>
					<Link to="/" className="nav-link">
						Home
					</Link>
				</li>
				<li>
					<Link to="/products" className="nav-link">
						Products
					</Link>
				</li>
				<li>
					<Link to="/about-us" className="nav-link">
						About Us
					</Link>
				</li>
				<li>
					<Link to="/basket" className="nav-link">
						Basket {displayNumberOfItems()}
					</Link>
				</li>
			</ul>
		</div>
	);
};
export default NavBar;
