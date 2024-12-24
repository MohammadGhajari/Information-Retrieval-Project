import { NavLink } from "react-router-dom";
import styles from "./../../styles/login-form.module.css";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { isEmail } from "validator";
import { toastError } from "./../../services/notify";

export default function LoginForm({
  type,
  setEmail,
  setPassword,
  setPasswordConfirm,
  emailError,
  passwordError,
  passwordConfirmError,
  onSubmit,
}) {
  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <h1>{type.toUpperCase()}</h1>

      <div className={styles["fields-container"]}>
        <div className={styles["email-container"]}>
          <label htmlFor="email">Email</label>
          <TextField
            required={true}
            id="email"
            label="Email"
            variant="outlined"
            size="small"
            style={{ width: "60%" }}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
          />
        </div>
        <div className={styles["password-container"]}>
          <label htmlFor="password">Password</label>
          <TextField
            id="password"
            type="password"
            required={true}
            label="Password"
            variant="outlined"
            size="small"
            style={{ width: "60%" }}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
          />
        </div>
        {type === "signup" && (
          <div className={styles["password-confirm-container"]}>
            <label htmlFor="password-confirm">Password Confirm</label>
            <TextField
              type="password"
              required={true}
              id="password-confirm"
              label="Password Confirm"
              variant="outlined"
              size="small"
              style={{ width: "60%" }}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              error={passwordConfirmError}
            />
          </div>
        )}
      </div>
      <div className={styles["submit-container"]}>
        {type === "signup" ? (
          <p>
            Do you have an account? <NavLink to={"/login"}>login</NavLink>
          </p>
        ) : (
          <p>
            Don't have an account? <NavLink to={"/signup"}>create one</NavLink>
          </p>
        )}
        <Button variant="outlined" type="submit">
          {type}
        </Button>
      </div>
    </form>
  );
}
