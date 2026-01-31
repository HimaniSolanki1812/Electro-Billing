import React, { useEffect, useState } from "react";
import "./PendingPayments.css";

// ✅ import from storage
import { getPaidBills, deletePaidBillByIndex } from "../utils/storage";

const PaidPayments = () => {
  const [paidBills, setPaidBills] = useState([]);

  useEffect(() => {
    // ✅ Fetch using storage.js
    const data = getPaidBills();
    setPaidBills(data);
  }, []);

  const deleteRecord = (index) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    // ✅ delete using storage.js
    deletePaidBillByIndex(index);

    // refresh state
    setPaidBills(getPaidBills());
  };

  return (
    <div className="pending-container">
      <div className="pending-card">
        <h2>Paid Payments</h2>

        {paidBills.length === 0 ? (
          <p>No paid records</p>
        ) : (
          <table className="pending-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Mobile</th>
                <th>Paid Amount</th>
                <th>Date</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paidBills.map((bill, i) => (
                <tr key={i}>
                  <td>{bill.customer}</td>
                  <td>{bill.mobile}</td>
                  <td>₹{bill.amount}</td>
                  <td>{bill.date}</td>
                  <td>{bill.time}</td>
                  <td>
                    <button
                      onClick={() => deleteRecord(i)}
                      style={{
                        background: "#ff4d4d",
                        color: "#fff",
                        border: "none",
                        padding: "6px 10px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
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

export default PaidPayments;
