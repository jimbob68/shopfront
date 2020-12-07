import firebase from 'firebase/app';
// import * as firebase from 'firebase';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBt2nY8TGQAaVC8yUT445EQsr5_xR8UHrM',
	authDomain: 'shopfront-7810d.firebaseapp.com',
	projectId: 'shopfront-7810d',
	storageBucket: 'shopfront-7810d.appspot.com',
	messagingSenderId: '789220340468',
	appId: '1:789220340468:web:92a096b9797876a26964a1',
	measurementId: 'G-Q0QBNS76Q9'
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;
