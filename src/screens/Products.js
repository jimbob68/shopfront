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
	const [ pageNumber, setPageNumber ] = useState(1);

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
		// let startIndex = pageNumber * 10 - 10;
		// const shortProductList = productsToDisplay.slice(startIndex, startIndex + 10);

		let startIndex = pageNumber * 6 - 6;
		const shortProductList = productsToDisplay.slice(startIndex, startIndex + 6);

		return shortProductList.map((product) => (
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
		setPageNumber(1);
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
			<div>
				<h6>Filter by Category</h6>
				<select onChange={(event) => filterProductsByType(event.target.value)}>
					<option defaultValue disabled>
						Filter by Category
					</option>
					<option value="All Products">All Products</option>
					{selectOptions}
				</select>
			</div>
		);
	};

	return (
		<div>
			<h1>Products</h1>
			{displayTypesSelectBox()}
			<div className="products-wrapper">
				{/* {products && displayProductsInfo()} */}
				{displayProductsInfo()}
			</div>
			<div className="page-number-button-container">
				{pageNumber > 1 && (
					<button className="page-button" onClick={() => setPageNumber(pageNumber - 1)}>
						Previous Page
					</button>
				)}
				{pageNumber} of {Math.ceil(productsToDisplay.length / 6)}
				{productsToDisplay.length / 6 > pageNumber && (
					<button className="page-button" onClick={() => setPageNumber(pageNumber + 1)}>
						Next Page
					</button>
				)}
			</div>
		</div>
	);
};
export default Products;
