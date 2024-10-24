import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import styles from "./HomeTop.module.css";

const HomeTop = ({ className = "" }) => {
  return (
    <section className={[styles.section, className].join(" ")}>
      <div className={styles.container}>
        <h1 className={styles.title}>My Personal Blog Posts</h1>
        <div className={styles.description}>
          Tales of your adventures, experiences & memories
        </div>
        {/* <div className={styles.input}>
          <div className={styles.textfield}>
            <input
              className={styles.text}
              placeholder="Search blogs"
              type="text"
            />
          </div>
        </div> */}
        <div className={styles.btnContainer}>
          <Link to={`/my-blogs`}>
            <div className={styles.secondary}>
              <div className={styles.title1}>View My Blogs</div>
            </div>
          </Link>
          <Link to={`/create`}>
            <div className={styles.primary}>
              <div className={styles.title1}>Create New Blog</div>
            </div>
          </Link>
        </div>
      </div>
      <img
        className={styles.sectionChild}
        loading="lazy"
        alt=""
        src="/vector-200.svg"
      />
    </section>
  );
};

HomeTop.propTypes = {
  className: PropTypes.string,
};

export default HomeTop;
