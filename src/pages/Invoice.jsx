import React from "react";
import { getNextInvoiceNumber } from "../utils/storage";

const Invoice = () => {
   const bill = JSON.parse(localStorage.getItem("lastBill"));

   if (!bill) return <p>No invoice found</p>;

   return (
     <div style={{ padding: "40px" }}>
       <h2>Invoice</h2>
       <p><strong>Customer:</strong> {bill.customer}</p>
       <p><strong>Date:</strong> {bill.date}</p>

       <table
         border="1"
         width="100%"
         cellPadding="10"
         style={{ borderCollapse: "collapse", marginTop: "20px" }}
       >
         <thead style={{ background: "#e2e8f0" }}>
           <tr>
             <th>Product</th>
             <th>Qty</th>
             <th>Price</th>
             <th>Total</th>
           </tr>
         </thead>
         <tbody>
           {bill.items.map((item, idx) => (
             <tr key={idx}>
               <td>{item.name}</td>
               <td>{item.quantity}</td>
               <td>₹{item.price}</td>
               <td>₹{item.total}</td>
             </tr>
           ))}
         </tbody>
       </table>
       <div style={{ marginTop: "20px" }}>
         <h3>Paid: ₹{bill.paid}</h3>
         <h3>Pending: ₹{bill.pending}</h3>
       </div>

       <button
         onClick={() => window.print()}
         style={{
           marginTop: "20px",
           padding: "10px 20px",
           borderRadius: "5px",
           backgroundColor: "#3b82f6",
           color: "#fff",
           border: "none",
           cursor: "pointer"
         }}
       >
         Print
       </button>
     </div>
   );
 };
 export default Invoice;
