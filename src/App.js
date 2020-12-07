import './App.css';
import Home from './screens/Home.js';
import NavBar from './components/NavBar.js';
import Footer from './components/Footer.js';
import Products from './screens/Products.js';
import AboutUs from './screens/AboutUs.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<Router>
				<NavBar />
				<Route exact path="/" component={Home} />
				<Route exact path="/products" component={Products} />
				<Route path="/about-us" component={AboutUs} />
				<Footer />
			</Router>
		</div>
	);
}

export default App;
