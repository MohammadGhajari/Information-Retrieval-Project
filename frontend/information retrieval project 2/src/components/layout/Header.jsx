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
import { useSelector, useDispatch } from "react-redux";
import { setIsDarkMode } from "./../../state management/darkModeSlice.js";
import {
  setEmail,
  setName,
  setPassword,
  setProfile,
  setUserID,
} from "../../state management/userSlice.js";
import { useNavigate } from "react-router-dom";

export default function Header() {
  // const [isDarkMode, setIsDarkMode] = useState(false);
  const { email, profile } = useSelector((state) => state.user);
  const { isDarkMode } = useSelector((state) => state.darkMode);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleDarkMode() {
    dispatch(setIsDarkMode(!isDarkMode));
  }

  function handleLogout() {
    dispatch(setName(""));
    dispatch(setEmail(""));
    dispatch(setProfile(""));
    dispatch(setPassword(""));
    dispatch(setUserID(""));

    localStorage.setItem("email", "");
    localStorage.setItem("name", "");
    localStorage.setItem("profile", "");
    localStorage.setItem("password", "");
    localStorage.setItem("userID", "");

    navigate("/");
  }
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <NavLink to={"/"} className={styles["logo"]}>
          {/* 💀SAMADI💀 */}
          SAMADI
          <img
            // src="https://static-00.iconduck.com/assets.00/penis-yellow-emoji-512x501-azqxh2dc.png"
            src="https://static-00.iconduck.com/assets.00/penis-black-emoji-512x501-2l9h76i7.png"
            alt="cock"
          />
        </NavLink>
        <button className={styles["darkmode-btn"]} onClick={handleDarkMode}>
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
                style={{ background: `URL(${profile})` }}
              ></button>

              <div className={styles["menu-container"]}>
                <button
                  onClick={handleDarkMode}
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
                <button className={styles["nav-btn"]} onClick={handleLogout}>
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
