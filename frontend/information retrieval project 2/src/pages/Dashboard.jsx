import { NavLink, Outlet } from "react-router-dom";
import styles from "./../styles/dashboard.module.css";
import { MdOutlineSecurity } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { FaRegFileWord } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";

export default function Dashboard() {
  return (
    <div className={styles["container"]}>
      <div className={styles["sidebar-container"]}>
        <NavLink className={styles["nav-btn"]} to={"personal-information"}>
          <span>
            <IoMdPerson />
          </span>
          <span>Personal Information</span>
        </NavLink>
        <NavLink className={styles["nav-btn"]} to={"security"}>
          <span>
            <MdOutlineSecurity />
          </span>
          <span>Security</span>
        </NavLink>
        <NavLink className={styles["nav-btn"]} to={"add-keyword"}>
          <span>
            <FaRegFileWord />
          </span>
          <span>Add Keyword</span>
        </NavLink>
        <NavLink className={styles["nav-btn"]} to={"analyze"}>
          <span>
            <IoStatsChartSharp />
          </span>
          <span>Analyze Website</span>
        </NavLink>
      </div>
      <div className={styles["content"]}>
        <Outlet />
      </div>
    </div>
  );
}
