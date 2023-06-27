import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function ProductPopup({ product, onClose, onAddToCart }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="product-details">
          <div className="product-image">
            <img src={`https://picsum.photos/seed/${product.title}/200/300`} alt={product.title} />
          </div>
          <div className="product-info">
            <h3 className="product-title">{product.title}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">${product.price}</p>
            <button onClick={onAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPopup;
