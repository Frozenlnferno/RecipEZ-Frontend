import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const MenuLinks = ({ setShowMenu }) => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowMenu(false);
    logout(); // ✅ Clears token, user, and favorites
    navigate("/login"); // optional redirect
  };

  return (
    <>
      <li>
        <Link to="/search" className="highlight" onClick={() => setShowMenu(false)}>
          Explore
        </Link>
      </li>

      <li>
        <Link to="/favorites" className="highlight" onClick={() => setShowMenu(false)}>
          Favorites
        </Link>
      </li>

      {!user && (
        <>
          <li>
            <Link to="/login" className="highlight" onClick={() => setShowMenu(false)}>
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup" className="highlight" onClick={() => setShowMenu(false)}>
              Sign Up
            </Link>
          </li>
        </>
      )}

      {user && (
        <>
          <li>
            <button
              className="highlight text-left w-full"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </li>
        </>
      )}
    </>
  );
};

export default MenuLinks;
