import { NavLink } from "react-router-dom";
import styles from "./../../styles/login-form.module.css";
import { Button, TextField, IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import { toastError } from "./../../services/notify";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
            required={true}
            id="password"
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            fullWidth
            size="small"
            style={{ width: "60%" }}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        {type === "signup" && (
          <div className={styles["password-confirm-container"]}>
            <label htmlFor="password-confirm">Password Confirm</label>
            <TextField
              required={true}
              id="password-confirm"
              label="Password Confirm"
              variant="outlined"
              type={showPasswordConfirm ? "text" : "password"}
              // fullWidth
              size="small"
              style={{ width: "60%" }}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              error={passwordConfirmError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPasswordConfirm(!showPasswordConfirm)
                      }
                      edge="end"
                    >
                      {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
