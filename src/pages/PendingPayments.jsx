import React, { useEffect, useState } from "react";
import "./PendingPayments.css";

// ✅ import functions from storage
import { getPendingBills, getPaidBills, setPendingBills, addPaidBill } from "../utils/storage";

const PendingPayments = () => {
  const [pendingCustomers, setPendingCustomers] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const data = getPendingBills(); // ✅ use storage.js
    setPendingCustomers(data);
  };

  const receivePayment = (id) => {
    let pending = getPendingBills();
    let paid = getPaidBills();

    const customer = pending.find((c) => c.id === id);
    if (!customer) return;

    // ✅ Add to paidBills using storage.js
    addPaidBill({
      customer: customer.name,
      mobile: customer.mobile,
      amount: customer.pending,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    });

    // Remove from pendingBills
    pending = pending.filter((c) => c.id !== id);

    // ✅ Update pendingBills using storage.js
    setPendingBills(pending);

    loadData();
    alert("Payment received successfully");
  };

  return (
    <div className="pending-container">
      <div className="pending-card">
        <h2>Pending Payments</h2>

        {pendingCustomers.length === 0 ? (
          <p>No pending payments</p>
        ) : (
          <table className="pending-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Pending</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingCustomers.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.mobile}</td>
                  <td>₹{c.pending}</td>
                  <td>
                    <button
                      style={{
                        background: "#3b82f6",
                        color: "#fff",
                        border: "none",
                        padding: "6px 10px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                      onClick={() => receivePayment(c.id)}
                    >
                      Receive
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PendingPayments;
