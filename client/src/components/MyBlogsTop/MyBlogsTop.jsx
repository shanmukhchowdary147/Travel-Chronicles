import PropTypes from "prop-types";
import styles from "./MyBlogsTop.module.css";
import { useNavigate } from "react-router-dom";
// import adventureBg from "../assets/images/adventure-bg.jpg";

const MyBlogsTop = ({ onSearch }) => {
  // const handleInputChange = (e) => {
  //   onSearch(e.target.value);
  // };
  const Navigate = useNavigate();
  const handleCreate = (e) => {
    e.preventDefault();
    Navigate("/create");
  };

  const handleExplore = (e) => {
    e.preventDefault();
    Navigate("/explore");
  };
  return (
    <div className={styles.heroContent}>
      <div className={styles.container}>
        <h1 className={styles.title}>Treasures of Your Adventures</h1>
        <div className={styles.description}>
          Explore the world through your travel stories
        </div>
        <div className={styles.inputContainer}>
          <input
            className={styles.inputPlaceholder}
            placeholder="Search for new adventures"
            type="text"
            onChange={onSearch}
          />
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.secondaryButton} onClick={handleExplore}>
            Explore
          </button>
          <button className={styles.primaryButton} onClick={handleCreate}>
            Create New +
          </button>
        </div>
      </div>

      {/* <img
        className={styles.sectionChild}
        alt=""
        src="../assets/images/adventure-bg.jpg"
      /> */}
    </div>
  );
};

MyBlogsTop.propTypes = {
  className: PropTypes.string,
};

export default MyBlogsTop;
