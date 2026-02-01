import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const isDashboard = location.pathname === "/dashboard";

  return (
    <header className="header">
      <h1 className="logo">Electronic Shop</h1>

      {/* ✅ If Dashboard → only show logout */}
      {isDashboard ? (
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <nav className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/billing">Billing</Link>
          <Link to="/pending-payments">Pending Payments</Link>
          <Link to="/paid-payments">Paid Payments</Link>
          <Link to="/history">Customer History</Link>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      )}
    </header>
  );
}

export default Header;
