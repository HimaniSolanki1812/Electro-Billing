import React, { useState } from "react";
import jsPDF from "jspdf";
import "./Billing.css";

// ✅ import storage functions
import {
  getPendingBills,
  setPendingBills,
  getPaidBills,
  addPaidBill,
} from "../utils/storage";

const Billing = () => {
  // Customer details
  const [customerName, setCustomerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  // Product details
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [billItems, setBillItems] = useState([]);
  const [paidAmount, setPaidAmount] = useState(0);

  // Add product
  const addItem = () => {
    if (!productName || !price) return;

    const total = Number(price) * quantity;

    setBillItems([
      ...billItems,
      { name: productName, price: Number(price), quantity, total },
    ]);

    setProductName("");
    setPrice("");
    setQuantity(1);
  };

  const currentTotal = billItems.reduce((sum, i) => sum + i.total, 0);

  // PDF Generator (unchanged)
  const generatePDF = (previousPending, grandTotal, pendingAmount) => {
    const doc = new jsPDF();
    const now = new Date();
    const dateTime = now.toLocaleString();
    const fileDate = now.toISOString().split("T")[0];

    doc.setFontSize(22);
    doc.text("ELECTRONIC SHOP INVOICE", 45, 20);

    doc.setFontSize(12);
    doc.text(`Date & Time: ${dateTime}`, 20, 35);

    doc.rect(15, 40, 180, 30);
    doc.text(`Customer Name : ${customerName}`, 20, 50);
    doc.text(`Mobile        : ${mobile}`, 20, 58);
    doc.text(`Address       : ${address}`, 20, 66);

    let y = 85;
    doc.text("Product", 20, y);
    doc.text("Qty", 100, y);
    doc.text("Price", 120, y);
    doc.text("Total", 160, y);

    y += 5;
    doc.line(15, y, 195, y);
    y += 10;

    billItems.forEach((item) => {
      doc.text(item.name, 20, y);
      doc.text(String(item.quantity), 100, y);
      doc.text(`₹${item.price}`, 120, y);
      doc.text(`₹${item.total}`, 160, y);
      y += 10;
    });

    y += 10;
    doc.line(15, y, 195, y);
    y += 10;

    doc.text(`Previous Pending : ₹${previousPending}`, 20, y);
    y += 8;
    doc.text(`Bill Total       : ₹${currentTotal}`, 20, y);
    y += 8;
    doc.text(`Grand Total      : ₹${grandTotal}`, 20, y);
    y += 8;
    doc.text(`Paid Amount      : ₹${paidAmount}`, 20, y);
    y += 8;

    doc.setFontSize(14);
    doc.text(`Final Pending    : ₹${pendingAmount}`, 20, y);

    doc.save(`${fileDate}_${customerName}.pdf`);
  };

  // ✅ Save Bill (storage.js used)
  const saveBill = () => {
    if (!customerName || billItems.length === 0) {
      alert("Enter customer details and add products");
      return;
    }

    const pendingBills = getPendingBills();

    const existingCustomer = pendingBills.find(
      (c) => c.mobile === mobile
    );

    const previousPending = existingCustomer
      ? existingCustomer.pending
      : 0;

    const grandTotal = currentTotal + previousPending;
    const pendingAmount = grandTotal - paidAmount;

    // Save paid part
    if (paidAmount > 0) {
      addPaidBill({
        customer: customerName,
        mobile,
        amount: paidAmount,
        date: new Date().toLocaleDateString(),
      });
    }

    // Update pending
    if (existingCustomer) {
      existingCustomer.pending = pendingAmount;
    } else {
      pendingBills.push({
        name: customerName,
        mobile,
        pending: pendingAmount,
      });
    }

    setPendingBills(pendingBills);

    alert("Bill saved & PDF generated ✅");

    generatePDF(previousPending, grandTotal, pendingAmount);

    // Reset
    setCustomerName("");
    setMobile("");
    setAddress("");
    setBillItems([]);
    setPaidAmount(0);
  };

  return (
    <div className="billing-container">
      <div className="billing-card">
        <h2>Billing</h2>

        <div className="section">
          <label>Customer Details</label>
          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="section">
          <label>Add Product</label>
          <div className="product-row">
            <input
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <button onClick={addItem}>Add</button>
          </div>
        </div>

        <table className="bill-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {billItems.map((i, idx) => (
              <tr key={idx}>
                <td>{i.name}</td>
                <td>{i.quantity}</td>
                <td>₹{i.price}</td>
                <td>₹{i.total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total-box">
          <label>Paid Amount</label>
          <input
            type="number"
            value={paidAmount}
            onChange={(e) => setPaidAmount(Number(e.target.value))}
          />
        </div>

        <button className="save-btn" onClick={saveBill}>
          Save Bill
        </button>
      </div>
    </div>
  );
};

export default Billing;
