import LoginForm from "../components/login-signup/LoginForm";
import styles from "./../styles/signup.module.css";
import { isEmail } from "validator";
import { useState } from "react";
import { toastError } from "../services/notify";
import { signUp } from "../services/handleRequests";
import { useDispatch } from "react-redux";
import { setEmail, setName } from "./../state management/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    setEmailError(false);
    setPasswordError(false);
    setPasswordConfirmError(false);

    if (!isEmail(userEmail)) {
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

    const data = {
      email: userEmail,
      password,
      passwordConfirm,
    };

    const status = await toast.promise(signUp(data), {
      pending: "Signing up...",
      success: "Account created!👋",
      error: "Try again.⚠️",
    });

    if (status === "success") {
      navigate("/login");
    }
  }

  return (
    <div className={styles.container}>
      <LoginForm
        type={"signup"}
        onSubmit={handleSubmit}
        setEmail={setUserEmail}
        setPassword={setPassword}
        setPasswordConfirm={setPasswordConfirm}
        emailError={emailError}
        passwordError={passwordError}
        passwordConfirmError={passwordConfirmError}
      />
    </div>
  );
}
