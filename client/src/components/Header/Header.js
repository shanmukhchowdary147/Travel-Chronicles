import PropTypes from "prop-types";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../authContext";
import { useContext } from "react";
import { IoLogOut } from "react-icons/io5";
import { MdTravelExplore } from "react-icons/md";
import { PiPencilCircleFill } from "react-icons/pi";
import { FaUserCog } from "react-icons/fa";
import { HiMiniViewColumns } from "react-icons/hi2";
// import { PiAirplaneTaxiingBold } from "react-icons/pi";

const Header = ({ className = "" }) => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <header className={[styles.topBar, className].join(" ")}>
      {/* <div className={styles.topBarChild} /> */}
      <div className={styles.titleWrapper}>
        <Link to="/" className={styles.logoRedirect}>
          <h2 className={styles.logoTitle}>
            <span className={styles.titleText}>TravelChronicles</span>
          </h2>
        </Link>
      </div>
      <div className={styles.topBarInner}>
        <div className={styles.tabContainerParent}>
          <div className={styles.tabContainer2}>
            <Link className={styles.tab} to="/my-blogs">
              My Blogs
            </Link>
            <HiMiniViewColumns />
          </div>
          <div className={styles.tabContainer2}>
            <Link className={styles.tab1} to="/explore">
              Public Blogs
            </Link>
            <MdTravelExplore />
          </div>
          <div className={styles.tabContainer2}>
            <Link className={styles.tab2} to="/create">
              Create
            </Link>
            <PiPencilCircleFill />
          </div>
          <div className={styles.tabContainer2}>
            <Link className={styles.tab2}>Profile</Link>
            <FaUserCog />
          </div>
          {user ? (
            <div className={styles.tabContainer2}>
              <div className={styles.tab2} onClick={handleLogout}>
                Logout
              </div>
              <IoLogOut />
            </div>
          ) : (
            <div className={styles.tabContainer2}>
              <Link className={styles.tab2} to="/login">
                Login
              </Link>
            </div>
          )}

          {/* <div className={styles.textfield}>
            <input
              className={styles.text}
              placeholder="Search in site"
              type="text"
            />
            <img className={styles.icSearchIcon} alt="" src="/icsearch.svg" />
          </div> */}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
