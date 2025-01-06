import LoginForm from "../components/login-signup/LoginForm";
import styles from "./../styles/login.module.css";
import { isEmail } from "validator";
import { useState } from "react";
import { toastError } from "../services/notify";
import { login } from "../services/handleRequests";
import { useDispatch } from "react-redux";
import {
  setEmail,
  setName,
  setProfile,
  setPassword,
  setUserID,
} from "./../state management/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    setEmailError(false);
    setPasswordError(false);

    if (!isEmail(userEmail)) {
      setEmailError(true);
      return toastError("Invalid email address.");
    }

    //then login

    const data = {
      email: userEmail,
      password: userPassword,
    };

    const { user } = await toast.promise(login(data), {
      pending: "Logging In...",
      success: `Welcome ${userEmail}!👋`,
      error: "Try again.⚠️",
    });

    if (user.email) {
      dispatch(setEmail(user.email));
      dispatch(setName(user.name));
      dispatch(setProfile(user.profile));
      dispatch(setUserID(user.id));
      dispatch(setPassword(userPassword));

      localStorage.setItem("email", user.email);
      localStorage.setItem("name", user.name);
      localStorage.setItem("profile", user.profile);
      localStorage.setItem("password", userPassword);
      localStorage.setItem("userID", user.id);

      navigate("/");
    }
  }

  return (
    <div className={styles.container}>
      <LoginForm
        type={"login"}
        onSubmit={handleSubmit}
        setEmail={setUserEmail}
        setPassword={setUserPassword}
        emailError={emailError}
        passwordError={passwordError}
      />
    </div>
  );
}
