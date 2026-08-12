import { useNavigate } from "react-router-dom";
import { logout } from "../auth/auth";

function LogoutButton({ onLogout }) {
  const navigate = useNavigate();

  function handleLogout() {
    logout();

    if (onLogout) {
      onLogout();
    }

    navigate("/");
  }

  return (
    <button type="button" onClick={handleLogout}>
      Log out
    </button>
  );
}

export default LogoutButton;