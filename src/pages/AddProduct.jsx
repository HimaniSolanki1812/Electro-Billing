import React, { useState } from "react";
import "./AddProduct.css";

// ✅ import from storage
import { addProduct } from "../utils/storage";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: ""
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!product.name || !product.price) {
      alert("Please fill required details");
      return;
    }

    // ✅ Save using storage.js
    addProduct({
      ...product,
      price: Number(product.price),
      stock: Number(product.stock) || 0
    });

    alert("Product Added Successfully");

    // reset fields
    setProduct({
      name: "",
      price: "",
      stock: ""
    });
  };

  return (
    <div className="product-container">
      <div className="product-card">
        <h2>Add Product</h2>
        <p className="subtitle">Enter product details</p>

        <input
          className="product-input"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
        />

        <input
          className="product-input"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
        />

        <input
          className="product-input"
          name="stock"
          placeholder="Stock Quantity"
          value={product.stock}
          onChange={handleChange}
        />

        <button className="product-button" onClick={handleSubmit}>
          Save Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
