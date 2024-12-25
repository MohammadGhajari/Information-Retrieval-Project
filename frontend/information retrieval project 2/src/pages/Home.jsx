import Hero from "../components/layout/Hero";
import Pricing from "../components/layout/Pricing";
import Principles from "../components/layout/Principles";
import styles from "./../styles/home.module.css";
export default function Home() {
  return (
    <div className={styles["container"]}>
      <Hero />
      <Pricing />
      <Principles />
    </div>
  );
}
