import styles from "./../../styles/main-container.module.css";
export default function MainContainer({ children }) {
  return <div className={styles["container"]}>{children}</div>;
}
