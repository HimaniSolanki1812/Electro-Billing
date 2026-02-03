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
    const doc = new jsPDF("p", "mm", "a4");
    
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("ELECTRONIC SHOP", 105, 18, { align: "center" });

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Sales Invoice", 105, 25, { align: "center" });

    doc.line(15, 30, 195, 30);

    doc.setFontSize(10);
    doc.text(`Invoice Date: ${date}`, 150, 36);
    doc.text(`Invoice Time: ${time}`, 150, 42);
    doc.rect(15, 38, 120, 28);

    doc.setFont("helvetica", "bold");
    doc.text("Customer Details", 18, 45);

    doc.setFont("helvetica", "normal");
    doc.text(`Name    : ${customerName}`, 18, 52);
    doc.text(`Mobile  : ${mobile}`, 18, 58);
    doc.text(`Address : ${address}`, 18, 64);
    
    let y = 75;

    doc.setFillColor(230, 230, 230);
    doc.rect(15, y, 180, 8, "F");

    doc.setFont("helvetica", "bold");
    doc.text("No", 18, y + 6);
    doc.text("Product", 30, y + 6);
    doc.text("Qty", 110, y + 6);
    doc.text("Price", 135, y + 6);
    doc.text("Total", 165, y + 6);
    
    y += 8;
    
    doc.setFont("helvetica", "normal");
    
    billItems.forEach((item, index) => {
      doc.rect(15, y, 180, 8);
      doc.text(String(index + 1), 18, y + 6);
      doc.text(item.name, 30, y + 6);
      doc.text(String(item.quantity), 110, y + 6);
      doc.text(`₹${item.price}`, 135, y + 6);
      doc.text(`₹${item.total}`, 165, y + 6);
      y += 8;
    });
    
    y += 5;
    
    doc.rect(120, y, 75, 32);
    
    doc.text(`Previous Pending : ₹${previousPending}`, 123, y + 8);
    doc.text(`Bill Total       : ₹${currentTotal}`, 123, y + 15);
    doc.text(`Paid Amount      : ₹${paidAmount}`, 123, y + 22);
    
    doc.setFont("helvetica", "bold");
    doc.text(`Final Pending    : ₹${pendingAmount}`, 123, y + 29);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text(
      "Thank you for your purchase!",
      105,
      285,
      { align: "center" }
    );
    
    doc.text(
      "This is a computer-generated invoice.",
      105,
      292,
      { align: "center" }
    );
    
    doc.save(`${customerName}_${date}.pdf`);
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
