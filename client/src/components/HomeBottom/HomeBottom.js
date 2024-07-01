import PropTypes from "prop-types";
import styles from "./HomeBottom.module.css";

const HomeBottom = ({ className = "" }) => {
  return (
    <section className={[styles.section, className].join(" ")}>
      <div className={styles.profileContent}>
        <div className={styles.profileInfo}>
          <div className={styles.avatar} />
          <div className={styles.container}>
            <h3 className={styles.title}>John Doe</h3>
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
