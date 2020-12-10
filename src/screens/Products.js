import React, { useEffect, useState } from 'react';
import './Products.css';
import ProductInfo from '../components/ProductInfo.js';
import firebase from 'firebase/app';
import 'firebase/storage';
import db from '../firebaseConfig.js';

const Products = ({ setBasketItems, basketItems }) => {
	const [ products, setProducts ] = useState([]);
	const [ productTypes, setProductTypes ] = useState([]);
	const [ productsToDisplay, setProductsToDisplay ] = useState([]);

	useEffect(() => {
		retrieveProducts();
	}, []);

	useEffect(
		() => {
			getProductTypes();
		},
		[ products ]
	);

	const retrieveProducts = async () => {
		const productsRef = db.collection('products');
		const productsData = await productsRef.get();
		setProducts(productsData.docs.map((doc) => doc.data()));
		setProductsToDisplay(productsData.docs.map((doc) => doc.data()));
	};

	const displayProductsInfo = () => {
		return productsToDisplay.map((product) => (
			<ProductInfo
				setBasketItems={setBasketItems}
				basketItems={basketItems}
				product={product}
				key={product.image}
			/>
		));
	};

	const getProductTypes = () => {
		const retrievedProductTypes = [];
		const sortedProducts = products.map((product) => product.type).sort();
		sortedProducts.forEach((product, index, array) => {
			if (array[index] !== array[index + 1]) {
				retrievedProductTypes.push(product);
			}
		});
		setProductTypes(retrievedProductTypes);
	};

	const filterProductsByType = (type) => {
		if (type === 'All Products') {
			setProductsToDisplay(products);
		} else {
			const filteredProducts = products.filter((product) => product.type === type);
			setProductsToDisplay(filteredProducts);
		}
	};

	const displayTypesSelectBox = () => {
		const selectOptions = productTypes.map((productType, index) => (
			<option key={index} value={productType}>
				{productType}
			</option>
		));
		return (
			<select onChange={(event) => filterProductsByType(event.target.value)}>
				<option defaultValue disabled>
					Filter by Category
				</option>
				<option value="All Products">All Products</option>
				{selectOptions}
			</select>
		);
	};

	return (
		<div>
			<h1>Products</h1>
			{displayTypesSelectBox()}
			{/* {products && displayProductsInfo()} */}
			{displayProductsInfo()}
		</div>
	);
};
export default Products;
