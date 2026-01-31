import React from "react";
import "./Contact.css";

function Contact() {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>

      <p>
        If you have any questions, suggestions, or need support regarding
        <strong> ElectroBilling</strong>, feel free to contact us.
      </p>

      <div className="contact-details">
        <p><strong>Shop Name:</strong> ElectroBilling Electronic Shop</p>
        <p><strong>Email:</strong> support@electrobilling.com</p>
        <p><strong>Phone:</strong> +91 98765 43210</p>
        <p><strong>Address:</strong> Rajkot, Gujarat, India</p>
      </div>

      <h2>Working Hours</h2>
      <p>Monday – Saturday: 9:00 AM – 8:00 PM</p>
      <p>Sunday: Closed</p>
    </div>
  );
}

export default Contact;
