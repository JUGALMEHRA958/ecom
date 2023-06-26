import React from 'react';
import "./Navbar.css"
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedTab } from '../redux/tabActions';

function Navbar() {
  const selectedTab = useSelector(state => state.tab.selectedTab);
  const dispatch = useDispatch();

  const handleTabClick = (tab) => {
    dispatch(setSelectedTab(tab));
  };

  return (
    <div className="navbar">
      <div className="left-section">
        <div className={`tab ${selectedTab === 'products' ? 'active' : ''}`} onClick={() => handleTabClick('products')}>
          Products
        </div>
        <div className={`tab ${selectedTab === 'addProduct' ? 'active' : ''}`} onClick={() => handleTabClick('addProduct')}>
          Add Product
        </div>
      </div>
      <div className="right-section">
        <div className="user-image">
          <img src="https://picsum.photos/id/237/200/300" alt="User" />
        </div>
        <div className="user-name">John Doe</div>
      </div>
    </div>
  );
}

export default Navbar;
