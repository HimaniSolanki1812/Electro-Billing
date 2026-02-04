// src/utils/storage.js

// Generic helpers
const getData = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};

const setData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// ================= CUSTOMERS =================
export const getCustomers = () => getData("customers");

export const addCustomer = (customer) => {
  const customers = getCustomers();
  customers.push(customer);
  setData("customers", customers);
};

// ================= PRODUCTS =================
export const getProducts = () => getData("products");

export const addProduct = (product) => {
  const products = getProducts();
  products.push(product);
  setData("products", products);
};

// ================= BILLS =================
export const getBills = () => getData("bills");

export const addBill = (bill) => {
  const bills = getBills();
  bills.push(bill);
  setData("bills", bills);
};

// Auto Bill Number
export const generateBillNumber = () => {
  const bills = getBills();
  return bills.length + 1;
};

// ================= PAYMENTS =================
export const updateBillPayment = (billNo, paidAmount, status) => {
  const bills = getBills();

  const updated = bills.map((bill) => {
    if (bill.billNo === billNo) {
      return {
        ...bill,
        paidAmount,
        status,
      };
    }
    return bill;
  });

  setData("bills", updated);
};

// ================= DASHBOARD =================
export const getSalesSummary = () => {
  const bills = getBills();

  const totalSales = bills.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalPending = bills
    .filter((b) => b.status === "Pending")
    .reduce((sum, b) => sum + (b.totalAmount - b.paidAmount), 0);

  return { totalSales, totalPending };
};
// ================= PENDING BILLS =================
export const getPendingBills = () => getData("pendingBills");

export const setPendingBills = (data) => {
  setData("pendingBills", data);
};

// ================= PAID BILLS =================
export const getPaidBills = () => getData("paidBills");

export const addPaidBill = (bill) => {
  const paid = getPaidBills();
  paid.push(bill);
  setData("paidBills", paid);
};
// Delete a paid bill by index
export const deletePaidBillByIndex = (index) => {
  const paid = getPaidBills();
  paid.splice(index, 1); // remove the item at index
  localStorage.setItem("paidBills", JSON.stringify(paid));
};


// ❌❌ DELETE CUSTOMER COMPLETELY ❌❌
export const deleteCustomerHistory = (customerName) => {
  // Remove from paid bills
  const paidBills = JSON.parse(localStorage.getItem("paidBills")) || [];
  const updatedPaid = paidBills.filter(
    (b) => b.customer.toLowerCase() !== customerName.toLowerCase()
  );
  localStorage.setItem("paidBills", JSON.stringify(updatedPaid));

  // Remove from pending bills
  const pendingBills = JSON.parse(localStorage.getItem("pendingBills")) || [];
  const updatedPending = pendingBills.filter(
    (p) => p.name.toLowerCase() !== customerName.toLowerCase()
  );
  localStorage.setItem("pendingBills", JSON.stringify(updatedPending));
};

//--Invoice Generation--
export const getNextInvooiceNumber = () => {
  let lastInvoice = localStorage.getItem("invoiceNumber")

  if (!lastInvoice) {
    lastInvoice = 1;
  } else {
    lastInvoice = parseInt(lastInvoice) + 1;
  }

  localStorage.setItem("InvoiceNumber", lastInvoice);

  return `INV-${String(lastInvoice).padStart(4, "0")}`
};