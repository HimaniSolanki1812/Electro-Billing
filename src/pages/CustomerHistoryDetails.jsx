import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPaidBills, getPendingBills } from "../utils/storage";

const CustomerHistoryDetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [pendingAmount, setPendingAmount] = useState(0);

  useEffect(() => {
    const paidBills = getPaidBills() || [];
    const pendingBills = getPendingBills() || [];

    const filtered = paidBills
      .filter(
        (bill) => bill.customer.toLowerCase() === name.toLowerCase()
      )
      // ✅ Descending order (latest first)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    setHistory(filtered);

    const customerPending = pendingBills.find(
      (c) => c.name.toLowerCase() === name.toLowerCase()
    );

    setPendingAmount(customerPending ? customerPending.pending : 0);
  }, [name]);

  const totalReceived = history.reduce(
    (sum, h) => sum + Number(h.paid || 0),
    0
  );

  return (
    <div style={{ padding: "40px" }}>
      <button
        onClick={() => navigate("/history")}
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          background: "#3b82f6",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        ← Back to Customers
      </button>

      <h2>{name} – Payment History</h2>

      {history.length === 0 ? (
        <p>No history found</p>
      ) : (
        <>
          <div
            style={{
              background: "#f1f5f9",
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "25px",
            }}
          >
            <p><strong>Customer Name:</strong> {name}</p>
            <p><strong>Mobile Number:</strong> {history[0]?.mobile}</p>
            <p><strong>Total Received:</strong> ₹{totalReceived}</p>
            <p><strong>Current Pending:</strong> ₹{pendingAmount}</p>
          </div>

          <table
            border="1"
            width="100%"
            cellPadding="10"
            style={{ borderCollapse: "collapse" }}
          >
            <thead>
              <tr style={{ background: "#e2e8f0" }}>
                <th>#</th>
                <th>Paid Amount</th>
                <th>Pending After Bill</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h, i) => {
                const dateObj = new Date(h.date);
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>₹{h.paid}</td>
                    <td>₹{h.pending}</td>
                    <td>{dateObj.toLocaleDateString()}</td>
                    <td>{dateObj.toLocaleTimeString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default CustomerHistoryDetails;
