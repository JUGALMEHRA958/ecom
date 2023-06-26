import React from 'react';
import "./Navbar.css"
function Navbar() {
  return (
    <div className="navbar">
      <div className="left-section">
        <div className="tab">Products</div>
        <div className="tab">Add Product</div>
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
