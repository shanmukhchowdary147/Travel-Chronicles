import "../styles/navbar.css";
import { useContext } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <div className="navbar-container">
      <Link to="/" className="navbar-logo">
        <p>TravelChronicles</p>
      </Link>

      <input type="checkbox" id="menu-bar" className="menu-bar-checkbox" />
      <label htmlFor="menu-bar" className="menu-bar-label">
        <FontAwesomeIcon icon={faBars} className="menu-bar-icon" />
      </label>

      <nav className="navbar">
        <ul className="navbar-list">
          <li>
            <Link to="/" className="navbar-link">
              <p>Home</p>
            </Link>
          </li>
          <li>
            <Link to="/create" className="navbar-link">
              <p>Create</p>
            </Link>
          </li>
          <li>
            <Link to="/explore" className="navbar-link">
              <p>Explore</p>
            </Link>
          </li>
          {user ? (
            <>
              <li
                onClick={handleLogout}
                className="navbar-link"
                style={{ cursor: "pointer" }}
              >
                <p>Logout</p>
              </li>
              <li className="profile-container">
                <div className="profile-picture">
                  <img
                    src={
                      user.profilePicture ||
                      "https://i.ibb.co/MBtjqXQ/no-avatar.gif"
                    }
                    alt="Profile"
                  />
                </div>
              </li>
              <li className="username-container">
                <p>{user.username}</p>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register" className="navbar-link">
                  <p>Register</p>
                </Link>
              </li>
              <li>
                <Link to="/login" className="navbar-link">
                  <p>Login</p>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
