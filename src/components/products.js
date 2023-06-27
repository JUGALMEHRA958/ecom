import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./products.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

function addToCart(product) {
  // Retrieve existing cart array from localStorage or create an empty array
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if the product is already in the cart
  const isProductInCart = cart.find(item => item.id === product.id);

  if (isProductInCart) {
    // Product is already in the cart, handle accordingly
    window.alert("Product is already in the cart.");
  } else {
    // Add the product to the cart array
    cart.push(product);

    // Store the updated cart array in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

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
            <button onClick={() => onAddToCart(product)}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Products() {
  const [data, setData] = useState([]);
  const [product, setProduct] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});
  const [sortByPrice, setSortByPrice] = useState(false);
  const [addedProducts, setAddedProducts] = useState([]);
  const [viewProduct, setViewProduct] = useState(null);

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
    setEditedProduct(prevEditedProduct => ({
      ...prevEditedProduct,
      [name]: value
    }));
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("https://my-json-server.typicode.com/Jugalmehra1958/demodb/products");
      const data = response.data;
      let sortedData = [...data];

      if (sortByPrice) {
        sortedData.sort((a, b) => a.price - b.price);
      } else {
        sortedData.sort((a, b) => b.price - a.price);
      }

      setData(sortedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();

    const cart = localStorage.getItem('cart');
    const parsedCart = cart ? JSON.parse(cart) : [];
    const addedProductIds = parsedCart.map(product => product.id);

    setAddedProducts(addedProductIds);
  }, [sortByPrice]);

  const handleSortByPrice = () => {
    setSortByPrice(!sortByPrice);
  };

  const openPopup = (product) => {
    setViewProduct(product);
  };

  const closePopup = () => {
    setViewProduct(null);
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
                <button
                  onClick={() => {
                    if (!addedProducts.includes(product.id)) {
                      addToCart(product);
                      window.alert("Added");
                      setAddedProducts(prevAddedProducts => [...prevAddedProducts, product.id]);
                      window.location.reload();
                    } else {
                      window.alert("Product is already in the cart.");
                    }
                  }}
                  disabled={addedProducts.includes(product.id)}
                >
                  {addedProducts.includes(product.id) ? "Added" : "Add to cart"}
                </button>
                <button onClick={() => openPopup(product)}>View details</button>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      ))}
      {viewProduct && (
      <div className="popup">
        <div className="popup-content">
          <button className="close-button" onClick={closePopup}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="product-details">
            <div className="product-image">
              <img src={`https://picsum.photos/seed/${viewProduct.title}/200/300`} alt={viewProduct.title} />
            </div>
            <div className="product-info">
              <h3 className="product-title">{viewProduct.title}</h3>
              <p className="product-description">{viewProduct.description}</p>
              <p className="product-price">${viewProduct.price}</p>
              <button onClick={() => addToCart(viewProduct)}>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}

export default Products;
