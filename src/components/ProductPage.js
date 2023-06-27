import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';

function ProductPage({ product }) {
//   const history = useHistory();

  const handleGoBack = () => {
    // history.goBack();
  };

  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      {/* <button onClick={handleGoBack}>Go Back</button> */}
    </div>
  );
}

export default ProductPage;
