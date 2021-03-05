import React from 'react';
import './Home.css';
import homePageImage from '../assets/crimboland_001.png';

const Home = () => {
	return (
		<div className="home-container">
			<p className="home-page-text">
				Welcome to our fantastic Christmas store, for all your festive requirements. If we don't have it, it's
				not worth buying!!! SALE NOW ON!!! Unbelievable bargains!!!
			</p>
			{/* <img className="home-page-image" src={homePageImage} alt="presents" /> */}
		</div>
	);
};
export default Home;
