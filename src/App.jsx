import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Layout
import Layout from "./components/Layout";

// Pages
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
// import AddCustomer from "./pages/AddCustomer";
// import AddProduct from "./pages/AddProduct";
import Billing from "./pages/Billing";
import PendingPayments from "./pages/PendingPayments";
import PaidPayments from "./pages/PaidPayments";
import Invoice from "./pages/Invoice";
import CustomerHistory from "./pages/CustomerHistory";
import CustomerHistoryDetails from "./pages/CustomerHistoryDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login page without header/footer */}
        <Route path="/" element={<LoginPage />} />

        {/* Pages with Layout wrapper */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        {/* <Route
          path="/add-customer"
          element={
            <Layout>
              <AddCustomer />
            </Layout>
          }
        /> */}
        {/* <Route
          path="/add-product"
          element={
            <Layout>
              <AddProduct />
            </Layout>
          }
        /> */}
        <Route
          path="/billing"
          element={
            <Layout>
              <Billing />
            </Layout>
          }
        />
        <Route
          path="/pending-payments"
          element={
            <Layout>
              <PendingPayments />
            </Layout>
          }
        />
        <Route
          path="/paid-payments"
          element={
            <Layout>
              <PaidPayments />
            </Layout>
          }
        />
        <Route
          path="/invoice"
          element={
            <Layout>
              <Invoice />
            </Layout>
          }
        />
        <Route
          path="/history"
          element={
            <Layout>
              <CustomerHistory />
            </Layout>
          }
        />
        <Route
          path="/history/:name"
          element={
            <Layout>
              <CustomerHistoryDetails />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
};

export default App;
