import styles from "./../../styles/hero.module.css";
import WomanAnalyzer from "./../svgs/WomanAnalyzer";
import ManAnalyzer from "./../svgs/ManAnalyzer";
import Analyzers from "./../svgs/Analyzers";

export default function Hero() {
  return (
    <div className={styles["container"]}>
      <h1>
        Boost your search rankings and dominate the digital world with our
        expert link building strategies
      </h1>
      <div className={styles["svg-container"]}>
        <WomanAnalyzer />
        <Analyzers />
        <ManAnalyzer />
      </div>
    </div>
  );
}
