import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Products from './components/products';
import Addproduct from './components/Addproduct';
import { useSelector } from 'react-redux';
import ProductPage from "./components/ProductPage"
import Cart from './components/Cart';
import DetailsShow from './components/DetailsShow';
function App() {
  const selectedTab = useSelector(state => state.tab.selectedTab);
  return (
    <div>
      <Navbar />
      {selectedTab === 'products' && <Products />}
      {selectedTab === 'addProduct' && <Addproduct />}
      {selectedTab === "detail" && <DetailsShow/>}
      {selectedTab === "cart" && (
        <div>
          <Cart />
        </div>
        
      )}
    </div>
  );
  
}


export default App;
