import PropTypes from "prop-types";
import styles from "./HomeMiddle.module.css";

const HomeMiddle = ({ className = "" }) => {
  return (
    <section className={[styles.list, className].join(" ")}>
      {/* <div className={styles.titleWrapper}>
        <h1 className={styles.title}>My Blogs</h1>
      </div> */}
      <div className={styles.rowWrapper}>
        <div className={styles.row}>
          <div className={styles.item}>
            <div className={styles.frameWrapper}>
              <div className={styles.frame}>
                <div className={styles.icon}>✍️</div>
              </div>
            </div>
            <div className={styles.titleParent}>
              <div className={styles.title1}>Travel Diaries</div>
              <div className={styles.subtitle}>Exploring new destinations</div>
            </div>
            <h2 className={styles.subtitle1}>Wanderlust Chronicles</h2>
          </div>
          <div className={styles.item1}>
            <div className={styles.frameContainer}>
              <div className={styles.frame1}>
                <div className={styles.icon1}>📸</div>
              </div>
            </div>
            <div className={styles.titleGroup}>
              <div className={styles.title2}>Photography Adventures</div>
              <div className={styles.subtitle2}>
                Capturing moments through my lens
              </div>
            </div>
            <h2 className={styles.subtitle3}>Captured Moments</h2>
          </div>
          <div className={styles.item2}>
            <div className={styles.frameDiv}>
              <div className={styles.frame2}>
                <div className={styles.icon2}>🎨</div>
              </div>
            </div>
            <div className={styles.titleContainer}>
              <div className={styles.title3}>Artistic Musings</div>
              <div className={styles.subtitle4}>Expressing Creativity</div>
            </div>
            <h2 className={styles.subtitle5}>Creative Escapades</h2>
          </div>
        </div>
      </div>
      <img className={styles.listChild} alt="" src="/vector-200.svg" />
    </section>
  );
};

HomeMiddle.propTypes = {
  className: PropTypes.string,
};

export default HomeMiddle;
