import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./products.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

function Products() {
  const [data, setData] = useState([]);
  const [product, setProduct] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});
  const [sortByPrice, setSortByPrice] = useState(false);

  const handleDelete = (productId) => {
    axios.delete(`https://my-json-server.typicode.com/Jugalmehra1958/demodb/products/${productId}`)
      .then(response => {
        if (response.status === 200) {
          // Perform any additional actions upon successful deletion
          window.alert("Delete success");
        }
      })
      .catch(error => {
        // Handle any errors that occur during the deletion
        console.error('Error deleting product:', error);
      });
  };

  const handleEdit = (product) => {
    setEditedProduct(product);
    setIsEditing(true);
  };

  const handleSave = () => {
    // Perform the save/update logic here
    // For simplicity, let's just log the edited product
    console.log(editedProduct);

    // Reset the edited product and editing state
    setEditedProduct({});
    setIsEditing(false);
    axios.put(`https://my-json-server.typicode.com/Jugalmehra1958/demodb/products/${editedProduct.id}`, editedProduct)
      .then(response => {
        if (response.status === 200) {
          // Perform any additional actions upon successful deletion
          window.alert("Edit success");
        }
      })
      .catch(error => {
        // Handle any errors that occur during the deletion
        console.error('Error deleting product:', error);
      });
  };

  const handleCancel = () => {
    // Reset the edited product and editing state
    setEditedProduct({});
    setIsEditing(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  useEffect(() => {
    let sortedData = [...data]; // Create a copy of the original data
  
    if (sortByPrice) {
      sortedData.sort((a, b) => a.price - b.price); // Sort by price in ascending order
    } else {
      sortedData.sort((a, b) => b.price - a.price); // Sort by price in descending order
    }
  
    setData(sortedData); // Update the sorted data in state
  }, [data, sortByPrice]);

  const handleSortByPrice = () => {
    setSortByPrice(!sortByPrice);
  };

  return (
    <div className="products-container">
      <div className="sort-button-container">
        <button onClick={handleSortByPrice}>
          Sort by Price {sortByPrice ? "(Ascending)" : "(Descending)"}
        </button>
      </div>
      {data.map(product => (
        <div className="product" key={product.title}>
          <div className="product-image">
            <img src={`https://picsum.photos/seed/${product.title}/200/300`} alt={product.title} />
          </div>
          <div className="product-details">
            <div className="product-rate"></div>
            <div>
              {isEditing ? (
                <>
                  <input
                    className="product-price"
                    name="price"
                    value={"$" + (editedProduct.price || product.price)}
                    onChange={handleInputChange}
                  />
                  <input
                    id="titleId"
                    className={`product-title ${isEditing ? 'editing' : ''}`}
                    name="title"
                    value={editedProduct.title || product.title}
                    onChange={handleInputChange}
                  />
                </>
              ) : (
                <>
                  <span className="product-price">${product.price}</span>
                  <h3 className={`product-title ${isEditing ? 'editing' : ''}`}>{product.title}</h3>
                </>
              )}
              <div></div>
              <span className="product-rating">Rating: {product.reviews}</span>
            </div>
            <div className="product-description">
              {isEditing ? (
                <textarea
                  name="description"
                  value={editedProduct.description || product.description}
                  onChange={handleInputChange}
                ></textarea>
              ) : (
                <p>{product.description}</p>
              )}
              <div className="buttons-container">
                {isEditing ? (
                  <>
                    <button onClick={handleSave}>
                      <FontAwesomeIcon icon={faSave} /> {/* Save icon */}
                    </button>
                    <button onClick={handleCancel}>
                      <FontAwesomeIcon icon={faTimes} /> {/* Cancel icon */}
                    </button>
                  </>
                ) : (
                  <button onClick={() => handleEdit(product)}>
                    <FontAwesomeIcon icon={faEdit} /> {/* Edit icon */}
                  </button>
                )}
                <button onClick={() => handleDelete(product.id)}>
                  <FontAwesomeIcon icon={faTrashAlt} /> {/* Delete icon */}
                </button>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
