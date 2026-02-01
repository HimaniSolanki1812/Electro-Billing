import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <div className="privacy-header">
        <h1 className="privacy-main-title">Privacy Policy</h1>
        <p className="privacy-intro">
          Your privacy matters to us. This page explains how we collect, use,
          and protect your personal information in the <strong>Electronic Shop Billing System</strong>.
        </p>
      </div>

      <div className="privacy-card">
        <h2>1. Information We Collect</h2>
        <p>
          We may collect personal information including your <strong>name, email, contact number, and billing details</strong> to provide
          a seamless shopping and billing experience. This information helps us
          improve services and personalize your experience.
        </p>
      </div>

      <div className="privacy-card">
        <h2>2. How We Use Your Information</h2>
        <p>
          Collected information is used solely for:
        </p>
        <ul>
          <li>Processing orders and generating invoices</li>
          <li>Managing customer accounts and purchase history</li>
          <li>Improving application features and usability</li>
        </ul>
        <p>
          We <strong>do not share your personal data with third parties</strong>.
        </p>
      </div>

      <div className="privacy-card">
        <h2>3. Data Security</h2>
        <p>
          Your data is stored securely on your device using local storage. We
          implement best practices to prevent unauthorized access and protect
          your information.
        </p>
      </div>

      <div className="privacy-card">
        <h2>4. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy periodically. Any changes will be
          reflected on this page. We encourage you to review it regularly.
        </p>
      </div>

      <div className="privacy-card">
        <h2>5. Your Consent</h2>
        <p>
          By using the <strong>Electronic Shop Billing System</strong>, you agree to the terms outlined in this Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
