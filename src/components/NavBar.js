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
			<div>
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
					<li>
					<button className="menu-button" onClick={() => handleHamburgerClick()}>
					Menu
					</button>
					</li>
				</ul>
				
			</div>
		</div>
	);
};
export default NavBar;
