import HomeTop from "../../components/HomeTop/HomeTop";
import HomeMiddle from "../../components/HomeMiddle/HomeMiddle";
import HomeBottom from "../../components/HomeBottom/HomeBottom";
// import FrameComponent from "../components/FrameComponent";
import styles from "./Home.module.css";
import HomeFirst from "../../components/HomeFirst/HomeFirst";

const Home = () => {
  return (
    <div className={styles.page}>
      <HomeFirst />
      <HomeTop />
      <HomeMiddle />
      <HomeBottom />
      {/* <FrameComponent /> */}
      <section className={styles.titleWrapper}>
        <div className={styles.title}>
          © 2024 Travel Chronicles. All Rights Reserved.
        </div>
      </section>
    </div>
  );
};

export default Home;
