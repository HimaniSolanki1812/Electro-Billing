import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// ✅ import storage
import { getPaidBills, getPendingBills } from "../utils/storage";

const CustomerHistoryDetails = () => {
  const { name } = useParams();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // ✅ Get real paid bills
    const paidBills = getPaidBills();

    // Filter for selected customer
    const filtered = paidBills.filter(
      (bill) => bill.customer.toLowerCase() === name.toLowerCase()
    );

    setHistory(filtered);
  }, [name]);

  const totalReceived = history.reduce(
    (sum, h) => sum + Number(h.amount),
    0
  );

  // ✅ Get current pending from pendingBills
  const pendingBills = getPendingBills();
  const customerPending = pendingBills.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );

  const pendingAmount = customerPending ? customerPending.pending : 0;

  return (
    <div style={{ padding: "40px" }}>
      <h2>{name} – Payment History</h2>

      {history.length > 0 && (
        <div
          style={{
            background: "#f1f5f9",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "25px",
          }}
        >
          <p><strong>Customer Name:</strong> {name}</p>
          <p><strong>Mobile Number:</strong> {history[0].mobile}</p>
          <p><strong>Total Received:</strong> ₹{totalReceived}</p>
          <p><strong>Pending Amount:</strong> ₹{pendingAmount}</p>
        </div>
      )}

      {history.length === 0 ? (
        <p>No history found</p>
      ) : (
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
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h, i) => {
              const dateObj = new Date(h.date);
              const date = dateObj.toLocaleDateString();
              const time = dateObj.toLocaleTimeString();

              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>₹{h.amount}</td>
                  <td>{date}</td>
                  <td>{time}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerHistoryDetails;
