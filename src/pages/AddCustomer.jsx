import React, { useState } from "react";
import "./AddCustomer.css";

// ✅ import from storage
import { addCustomer } from "../utils/storage";

const AddCustomer = () => {
  const [customer, setCustomer] = useState({
    name: "",
    mobile: "",
    address: "",
    pending: ""
  });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!customer.name || !customer.mobile) {
      alert("Please fill required details");
      return;
    }

    // ✅ Save using storage.js
    addCustomer({
      ...customer,
      pending: Number(customer.pending) || 0
    });

    alert("Customer Added Successfully");

    // reset fields
    setCustomer({
      name: "",
      mobile: "",
      address: "",
      pending: ""
    });
  };

  return (
    <div className="customer-container">
      <div className="customer-card">
        <h2>Add Customer</h2>
        <p className="subtitle">Enter customer details</p>

        <input
          className="customer-input"
          name="name"
          placeholder="Customer Name"
          value={customer.name}
          onChange={handleChange}
        />

        <input
          className="customer-input"
          name="mobile"
          placeholder="Mobile Number"
          value={customer.mobile}
          onChange={handleChange}
        />

        <input
          className="customer-input"
          name="address"
          placeholder="Address"
          value={customer.address}
          onChange={handleChange}
        />

        <input
          className="customer-input"
          name="pending"
          placeholder="Pending Amount"
          value={customer.pending}
          onChange={handleChange}
        />

        <button className="customer-button" onClick={handleSubmit}>
          Save Customer
        </button>
      </div>
    </div>
  );
};

export default AddCustomer;
