import React from 'react';
import './AboutUs.css';
import { FaFacebookSquare, FaTwitterSquare, FaInstagramSquare } from 'react-icons/fa';

const AboutUs = () => {
	return (
		<div className="about-container">
			<h1>About Us</h1>
			<div className="about-info">
				<p>We are a small family company, dedicated to keeping that Christmas spirit alive ALL year long!!!</p>
			</div>
			<div className="about-shop-opening-times">
				<h2>Store Opening Times</h2>
				<table>
					<tr>
						<th>Monday - Friday</th>
						<th>Saturday - Sunday</th>
					</tr>
					<tr>
						<td>08:00 - 22:00</td>
						<td>08:00 - 20:00</td>
					</tr>
				</table>
			</div>
			<div className="about-social-media-details">
				<FaFacebookSquare className="facebook-icon" />
				<FaTwitterSquare className="twitter-icon" />
				<FaInstagramSquare className="instagram-icon" />
			</div>
		</div>
	);
};
export default AboutUs;
