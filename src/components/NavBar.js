import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const NavBar = ({ basketItems, setPageNumber }) => {
	
	const displayNumberOfItems = () => {
		let numberOfItems = 0;
		for (const [ key, value ] of Object.entries(basketItems)) {
			numberOfItems += value.amount;
		}
		return '(' + numberOfItems + ')';
	};

	const handleHamburgerClick = () => {
		let navBarElement = document.getElementById('myNavigation');
		if (navBarElement.className === 'nav-bar') {
			navBarElement.className += ' responsive';
		} else {
			navBarElement.className = 'nav-bar';
		}
		console.log('navBarElement', navBarElement);
	};
	// 	function myFunction() {
	//   var x = document.getElementById("myTopnav");
	//   if (x.className === "topnav") {
	//     x.className += " responsive";
	//   } else {
	//     x.className = "topnav";
	//   }
	// }

	return (
		<div className="nav-bar" id="myNavigation">
			<h1 className="nav-bar-shop-title">Chrimbo Land</h1>
			<div className="nav-bar-links-container">
				<ul>
					<li>
						<Link to="/" className="nav-link">
							Home
						</Link>
					</li>
					<li onClick={()=> setPageNumber(1)}>
						{/* resets the products page when on another viewed page */}
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
				<i className="menu-icon" onClick={() => handleHamburgerClick()}>
					<FaBars />
				</i>
			</div>
		</div>
	);
};
export default NavBar;
