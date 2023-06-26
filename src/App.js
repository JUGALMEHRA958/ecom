import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Products from './components/products';
import Addproduct from './components/Addproduct';
import { useSelector } from 'react-redux';
function App() {
console.log(useSelector,"useSelector 8");
  const selectedTab = useSelector(state => state.tab.selectedTab);
  console.log(selectedTab , "99")
  return (
    <div>
      <Navbar />
      {selectedTab === 'products' && <Products />}
      {selectedTab === 'addProduct' && <Addproduct/>}
    </div>
  );
}


export default App;
