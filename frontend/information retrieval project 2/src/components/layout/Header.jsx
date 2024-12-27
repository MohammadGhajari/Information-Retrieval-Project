import styles from "./../../styles/header.module.css";
import { FaRegMoon } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { BsExclamationCircle } from "react-icons/bs";
import { FaQuestion } from "react-icons/fa6";
import validator from "validator";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";
import { IoSunnyOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import { useSelector } from "react-redux";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { email } = useSelector((state) => state.user);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <NavLink
          to={"/"}
          style={{ marginLeft: "1rem", fontSize: "3rem", fontWeight: "bold" }}
        >
          💀SAMADI💀
        </NavLink>
        <button className={styles["darkmode-btn"]}>
          {isDarkMode ? <IoSunnyOutline /> : <FaRegMoon />}
        </button>
        <div className={styles["nav-container"]}>
          <NavLink
            to="/about-us"
            className={`${styles["about-us-btn"]} ${styles["nav-btn"]}`}
          >
            <span>
              <BsExclamationCircle />
            </span>
            <span>About Us</span>
          </NavLink>
          <span className={styles.divider}></span>
          <Link
            to="/#faq"
            className={`${styles["faq-btn"]} ${styles["nav-btn"]}`}
          >
            <span>
              <FaQuestion />
            </span>
            <span>FAQ</span>
          </Link>
        </div>
      </div>
      <div className={styles.right}>
        {validator.isEmail(email) ? (
          <>
            <div className={styles["profile-container"]}>
              <button
                className={styles["img-container"]}
                style={{ background: `URL('./../../../../profile.webp')` }}
              ></button>

              <div className={styles["menu-container"]}>
                <button
                  className={`${styles["nav-btn"]} ${styles["dark-btn"]}`}
                >
                  <span>Dark mode</span>
                  <span>
                    <FaRegMoon />
                  </span>
                </button>

                <NavLink className={styles["nav-btn"]} to="/dashboard">
                  <span>Dashboard</span>
                  <span>
                    <MdOutlineDashboardCustomize />
                  </span>
                </NavLink>
                <NavLink className={styles["nav-btn"]} to="/add-website">
                  <span>Add Website</span>
                  <span>
                    <IoAddCircleOutline />
                  </span>
                </NavLink>
                <NavLink className={styles["nav-btn"]} to="/edit-website">
                  <span>Edit Website</span>
                  <span>
                    <MdOutlineModeEdit />
                  </span>
                </NavLink>
                <NavLink className={styles["nav-btn"]} to="/delete-website">
                  <span>Delete Website</span>
                  <span>
                    <RiDeleteBin6Line />
                  </span>
                </NavLink>
                <button className={styles["nav-btn"]}>
                  <span>Logout</span>
                  <span>
                    <MdOutlineLogout />
                  </span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <NavLink
            to="/login"
            className={`${styles["login-btn"]} ${styles["nav-btn"]}`}
          >
            <span style={{ fontSize: "1.8rem" }}>Login</span>
            <span>
              <IoMdLogIn />
            </span>
          </NavLink>
        )}
      </div>
    </div>
  );
}
