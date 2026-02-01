import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerHistory.css";

import { getPaidBills, deleteCustomerHistory } from "../utils/storage";

const CustomerHistory = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = () => {
    const paid = getPaidBills() || [];
    const uniqueCustomers = [...new Set(paid.map((bill) => bill.customer))];
    setCustomers(uniqueCustomers);
  };

  const filteredCustomers = customers.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (name, e) => {
    e.stopPropagation();

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ALL history of ${name}?`
    );

    if (!confirmDelete) return;

    deleteCustomerHistory(name);
    setCustomers((prev) => prev.filter((c) => c !== name));
  };

  return (
    <div className="history-container">
      {/* Header with title and search */}
      <div className="history-header">
        <div className="header-text">
          <h2 className="history-title">Customer Payment History</h2>
          <p className="history-subtitle">
            Click a customer to view their payment details
          </p>
        </div>

        <div className="header-search">
          <input
            type="text"
            placeholder="Search customer..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Customer Cards */}
      <div className="customer-card-grid">
        {filteredCustomers.map((name, index) => (
          <div key={index} className="customer-card">
            <div className="avatar">{name.charAt(0)}</div>
            <h3>{name}</h3>

            <div className="card-actions">
              <button
                className="view-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/history/${name}`);
                }}
              >
                View
              </button>

              <button
                className="delete-btn"
                onClick={(e) => handleDelete(name, e)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerHistory;
