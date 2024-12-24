import LoginForm from "../components/login-signup/LoginForm";
import styles from "./../styles/login.module.css";
import { isEmail } from "validator";
import { useState } from "react";
import { toastError } from "../services/notify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    setEmailError(false);
    setPasswordError(false);

    if (!isEmail(email)) {
      setEmailError(true);
      toastError("Invalid email address.");
      return;
    }

    //then login
  }

  return (
    <div className={styles.container}>
      <LoginForm
        type={"login"}
        onSubmit={handleSubmit}
        setEmail={setEmail}
        setPassword={setPassword}
        emailError={emailError}
        passwordError={passwordError}
      />
    </div>
  );
}
