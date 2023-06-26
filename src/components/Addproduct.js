import React, { useState } from 'react';
import axios from 'axios';
import './Addproduct.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Addproduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState();

  const handleAdd = () => {
    const newProduct = {
      name: name,
      description: description,
      rating: rating,
      price: price
    };

    axios.post('https://my-json-server.typicode.com/Jugalmehra1958/demodb/products', newProduct)
      .then(response => {
        if (response.status === 201) {
          // Perform any additional actions upon successful addition
          window.alert("Product added successfully");
          // Reset the input values
          setName('');
          setDescription('');
          setRating(0);
          setPrice(0);
        }
      })
      .catch(error => {
        // Handle any errors that occur during the addition
        console.error('Error adding product:', error);
      });
  };

  return (
    <div className="addProduct container">
      <label>Name</label>
      <input value={name} onChange={event => setName(event.target.value)} />
      <label>Description</label>
      <textarea value={description} onChange={event => setDescription(event.target.value)} />
      <label>Rating</label>
      <input type="number" value={rating} onChange={event => setRating(event.target.value)} />
      <label>Price</label>
      <input type="number" value={price} onChange={event => setPrice(event.target.value)} /><br></br>
      <button id='addbtn' onClick={handleAdd}>Add</button>
    </div>
  );
}

export default Addproduct;
