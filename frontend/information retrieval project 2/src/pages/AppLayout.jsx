import styles from "./../styles/app-layout.module.css";
import Header from "./../components/layout/Header";
import { Outlet } from "react-router-dom";
import Footer from "./../components/layout/Footer";
import MainContainer from "./../components/layout/MainContainer";

export default function AppLayout() {
  return (
    <div className={styles.container}>
      <Header />
      <MainContainer>
        <Outlet />
      </MainContainer>
      <Footer />
    </div>
  );
}
