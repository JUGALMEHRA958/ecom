import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Products from './components/products';
import Addproduct from './components/Addproduct';
import { useSelector } from 'react-redux';
import Cart from './components/Cart';
function App() {
console.log(useSelector,"useSelector 8");
  const selectedTab = useSelector(state => state.tab.selectedTab);
  console.log(selectedTab , "99")
  return (
    <div>
      <Navbar />
      {selectedTab === 'products' && <Products />}
      {selectedTab === 'addProduct' && <Addproduct />}
      {selectedTab === "cart" && (
        <div>
          <Cart />
          
        </div>
      )}
    </div>
  );
  
}


export default App;
