import React, { useEffect, useState } from 'react';
import Products from '../screens/Products';
import './ProductInfo.css';
import firebase from 'firebase/app';
import 'firebase/storage';

const ProductInfo = ({ product }) => {

    const [ imageSrc, setImageSrc ] = useState("")

    useEffect(() => {
        retrieveImage()
    }, [])

    const retrieveImage = () => {
		const imageRef = firebase.storage().ref(product.image);
		imageRef.getDownloadURL()
			.then((imageURL) => setImageSrc(imageURL))
	};

	return (
        <div>
            <p><b>Name:</b> {product.name}</p>
			<p><b>Price:</b> £{product.price}</p>
			<p><b>Description:</b> {product.description}</p>
			<p><b>Manufacturer:</b> {product.manufacturer}</p>
		    <img src={imageSrc} alt="product" />
        </div>
    )
}

export default ProductInfo
