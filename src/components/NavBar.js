import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
	return (
		<div className="nav-bar">
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
						Basket
					</Link>
				</li>
			</ul>
		</div>
	);
};
export default NavBar;
