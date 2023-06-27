import React from 'react';

function Cart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((product, index) => (
            <li key={index}>
              <div>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Reviews: {product.reviews}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
