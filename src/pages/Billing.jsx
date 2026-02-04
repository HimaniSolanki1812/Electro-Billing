import React, { useState } from "react";
import jsPDF from "jspdf";
import "./Billing.css";

// import storage functions
import {
  getPendingBills,
  setPendingBills,
  getPaidBills,
  addPaidBill,
  getNextInvoiceNumber
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
    const invoiceNumber = getNextInvoiceNumber();
    
    const doc = new jsPDF("p", "mm", "a4");
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    
    doc.setFillColor(30, 136, 229);
    doc.rect(0, 0, 210, 32, "F");

    doc.setTextColor(255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("ELECTRO BILLING", 105, 20, { align: "center" });

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Electronic Sales Invoice", 105, 27, { align: "center" });

    doc.setTextColor(0);

    doc.setFontSize(10);
    doc.setFont("helevetica", "bold");
    doc.text(`Invoice No: ${invoiceNumber}`, 150, 40);
    doc.setFont("helvetica", "normal");
    doc.text(`Invoice Date: ${date}`, 15, 40);
    doc.text(`Time: ${time}`, 15, 46);

  
    doc.setFillColor(245, 247, 250);
    doc.rect(15, 52, 180, 26, "F");

    doc.setFont("helvetica", "bold");
    doc.text("Customer Details", 18, 60);

    doc.setFont("helvetica", "normal");
    doc.text(`Name    : ${customerName}`, 18, 67);
    doc.text(`Mobile  : ${mobile}`, 18, 73);
    doc.text(`Address : ${address}`, 18, 79);

  
    let y = 90;

    doc.rect(15, y, 180, 10 + billItems.length*8);

    doc.setFillColor(224, 224, 224);
    doc.rect(15, y, 180, 10, "F");

    doc.setFont("helvetica", "bold");
    doc.text("Product", 20, y + 7);
    doc.text("Qty", 115, y + 7);
    doc.text("Rate", 135, y + 7);
    doc.text("Amount", 165, y + 7);
    
    y += 10;
    doc.setFont("helvetica", "normal");
    
    billItems.forEach((item) => {
      doc.line(15, y, 195, y);
      doc.text(item.name, 20, y+6);
      doc.text(String(item.quantity), 115, y+6);
      doc.text(`₹${item.price}`, 135, y+6);
      doc.text(`₹${item.total}`, 165, y+6);
      y += 8;
    });
    
    y += 10;
    
    doc.setFillColor(240, 248, 255);
    doc.rect(110, y, 85, 36, "F");

    doc.setFontSize(10); 
    doc.setFont("helvetica", "normal");
    doc.text(`Previous Pending : ₹${previousPending}`, 115, y + 8);
    doc.text(`Bill Amount      : ₹${currentTotal}`, 115, y + 16);
    doc.text(`Paid Amount      : ₹${paidAmount}`, 115, y + 24);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`Final Pending : ₹${pendingAmount}`, 115, y + 33);

  
    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    doc.text("This is a Software generated invoice", 105, 285, {
      align: "center",
    });
    doc.text("Visit Again!", 105, 287, { align: "center" });
    
    doc.save(`${customerName}_${date}_Invoice.pdf`);
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
