import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerHistory.css";

// ✅ import from storage
import { getPaidBills } from "../utils/storage";

const CustomerHistory = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Get paid bills using storage.js
    const paid = getPaidBills();

    // Extract unique customer names
    const uniqueCustomers = [...new Set(paid.map((bill) => bill.customer))];
    setCustomers(uniqueCustomers);
  }, []);

  return (
    <div className="history-container">
      <h2 className="history-title">Customer Payment History</h2>
      <p className="history-subtitle">
        Click a customer to view their payment details
      </p>

      <div className="customer-card-grid">
        {customers.map((name, index) => (
          <div
            key={index}
            className="customer-card"
            onClick={() => navigate(`/customer-history/${name}`)}
          >
            <div className="avatar">{name.charAt(0)}</div>
            <h3>{name}</h3>
            <span>View Payments</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerHistory;
