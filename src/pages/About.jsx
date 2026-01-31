import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <h1>About ElectroBilling</h1>

      <p>
        <strong>ElectroBilling</strong> is a smart Electronic Shop Billing System
        developed to make the billing process simple, fast, and accurate for
        electronic retail stores. It helps shop managers generate bills, track
        payments, and monitor daily sales efficiently.
      </p>

      <p>
        This system is designed to reduce manual work and provide a professional
        billing experience similar to real-world shop billing software. With
        features like automatic bill number generation, previous pending
        calculation, payment status tracking, and dashboard sales summary,
        ElectroBilling ensures smooth shop management.
      </p>

      <h2>Key Features</h2>
      <ul>
        <li>Automatic Invoice / Bill Number</li>
        <li>Previous Pending Amount Auto Add</li>
        <li>Payment Status (Paid / Unpaid / Partial)</li>
        <li>Update Pending Payments</li>
        <li>Search Bills by Customer, Date, or Bill No</li>
        <li>Sales Summary Dashboard</li>
        <li>Dark / Light Mode</li>
        <li>Secure Login & Session Protection</li>
      </ul>

      <h2>Our Goal</h2>
      <p>
        The main goal of ElectroBilling is to provide an easy-to-use billing
        solution for electronic shops using modern web technology. It allows
        shop owners to maintain records properly and improve overall efficiency.
      </p>
    </div>
  );
}

export default About;
