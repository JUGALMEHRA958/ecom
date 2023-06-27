import React from 'react';

function DetailsShow() {
  // Retrieve the selected product from localStorage
  const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

  if (!selectedProduct) {
    return null; // Handle the case when no product is selected
  }

  return (
    <div>
      <h1>{selectedProduct.title}</h1>
      <p>{selectedProduct.description}</p>
      <p>Price: ${selectedProduct.price}</p>
      <p>Rating: {selectedProduct.reviews}</p>
    </div>
  );
}

export default DetailsShow;
