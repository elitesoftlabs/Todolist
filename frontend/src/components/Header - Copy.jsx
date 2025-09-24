import { Link } from "react-router-dom";
import { logout } from "../services/authService";

function Header() {
  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Task Manager</Link>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <button className="btn btn-outline-light" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Header;
