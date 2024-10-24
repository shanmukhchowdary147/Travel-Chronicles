import PropTypes from "prop-types";
import styles from "./HomeBottom.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const HomeBottom = ({ className = "" }) => {
  const [userName, setUserName] = useState("Loading..."); // State to hold the username

  // Function to fetch username from the backend
  const fetchUserName = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/users/view`,
        {
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );

      // Set the username from the response to state
      setUserName(response.data.userName);
    } catch (error) {
      console.error("Error fetching username:", error);
      setUserName("Failed to load username");
    }
  };

  // Use useEffect to call fetchUserName when the component mounts
  useEffect(() => {
    fetchUserName();
  }, []);
  return (
    <section className={[styles.section, className].join(" ")}>
      <div className={styles.profileContent}>
        <div className={styles.profileInfo}>
          <div className={styles.avatar} />
          <div className={styles.container}>
            <h3 className={styles.title}>{userName}</h3>
            <div className={styles.selection}>
              <div className={styles.labelNormal}>
                <div className={styles.labelText}>Blogger</div>
              </div>
              <div className={styles.labelNormal1}>
                <div className={styles.labelText1}>Writer</div>
              </div>
            </div>
            <div className={styles.description}>
              Passionate about sharing my thoughts through blogs.
            </div>
          </div>
          <div className={styles.profileButton}>
            <button className={styles.primary}>
              <div className={styles.title1}>Edit Profile</div>
            </button>
          </div>
        </div>
      </div>
      <img className={styles.sectionChild} alt="" src="/vector-200.svg" />
    </section>
  );
};

HomeBottom.propTypes = {
  className: PropTypes.string,
};

export default HomeBottom;
