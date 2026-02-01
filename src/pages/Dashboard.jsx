import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Manager Dashboard</h2>
      <p className="dashboard-subtitle">Electronic Shop Billing System</p>

      <div className="card-grid">
        <Link to="/billing" className="dashboard-card">
          <h3>Billing</h3>
          <p>Create customer bills</p>
        </Link>

        <Link to="/history" className="dashboard-card">
          <h3>Customer History</h3>
          <p>Payment history of customers</p>
        </Link>

        <Link to="/pending-payments" className="dashboard-card">
          <h3>Pending Payments</h3>
          <p>View due amounts</p>
        </Link>

        <Link to="/paid-payments" className="dashboard-card">
          <h3>Paid Payments</h3>
          <p>View completed payments</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
