import { Link, useNavigate } from "react-router-dom";
import { logout } from "../auth/auth";

function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogout() {
    logout();

    setUser(null);

    navigate("/");
  }

  return (
    <nav>
      <Link to="/">Home</Link>

      {user ? (
        <>
          <span>Welcome, {user.first_name}</span>

          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;