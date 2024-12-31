import LoginForm from "../components/login-signup/LoginForm";
import styles from "./../styles/signup.module.css";
import { isEmail } from "validator";
import { useState } from "react";
import { toastError } from "../services/notify";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    setEmailError(false);
    setPasswordError(false);
    setPasswordConfirmError(false);

    if (!isEmail(email)) {
      setEmailError(true);
      return toastError("Invalid email address.");
    }
    if (password.length < 8) {
      setPasswordError(true);
      return toastError("Password length must be at least 8 characters.");
    }
    if (password !== passwordConfirm) {
      setPasswordError(true);
      setPasswordConfirmError(true);
      return toastError("Password and password confirm must be the same.");
    }

    //then sign up
  }

  return (
    <div className={styles.container}>
      <LoginForm
        type={"signup"}
        onSubmit={handleSubmit}
        setEmail={setEmail}
        setPassword={setPassword}
        setPasswordConfirm={setPasswordConfirm}
        emailError={emailError}
        passwordError={passwordError}
        passwordConfirmError={passwordConfirmError}
      />
    </div>
  );
}
