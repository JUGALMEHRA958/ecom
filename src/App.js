import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Products from './components/products';
import Addproduct from './components/Addproduct';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Addproduct/>
      <Products/>
    </div>
  );
}

export default App;
