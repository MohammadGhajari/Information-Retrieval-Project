import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Password, Visibility, VisibilityOff } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { toastError, toastSuccess } from "./../services/notify";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { resetPassword } from "../services/handleRequests";
import { setPassword } from "../state management/userSlice";

export default function Security() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { email, name, profile } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  async function handleSubmit() {
    if (!currentPassword || !newPassword || !confirmPassword) return;

    if (newPassword.length < 8)
      return toastError("Password must be at least 8 characters");

    if (newPassword !== confirmPassword)
      return toastError("New password and confirm password must be the same");

    //then change the password

    const data = {
      password: currentPassword,
      newPassword,
      passwordConfirm: confirmPassword,
      email,
    };

    const res = await toast.promise(resetPassword(data), {
      pending: "Changing password...",
      success: `Password changed successfully!!!`,
      error: "Try again.⚠️",
    });
    if (res === "success") {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);

      dispatch(setPassword(newPassword));
      localStorage.setItem("password", newPassword);
    }
  }

  return (
    <div>
      <Typography
        variant="h1"
        component="h1"
        gutterBottom
        fontSize={"2em"}
        fontFamily={"Rajdhani"}
        fontWeight={"bold"}
        marginBottom={7}
        color="var(--color-grey-3)"
      >
        Reset Password
      </Typography>

      <TextField
        label="Current Password"
        variant="outlined"
        type={showCurrentPassword ? "text" : "password"}
        fullWidth
        margin="normal"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        style={{ boxShadow: "var(--shadow-me-sm" }}
        size={useMediaQuery("(max-width:500px)") ? "small" : "medium"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                edge="end"
              >
                {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="New Password"
        variant="outlined"
        type={showNewPassword ? "text" : "password"}
        fullWidth
        margin="normal"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        style={{ boxShadow: "var(--shadow-me-sm" }}
        size={useMediaQuery("(max-width:500px)") ? "small" : "medium"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowNewPassword(!showNewPassword)}
                edge="end"
              >
                {showNewPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Current Password"
        variant="outlined"
        type={showConfirmPassword ? "text" : "password"}
        fullWidth
        margin="normal"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={{ boxShadow: "var(--shadow-me-sm" }}
        size={useMediaQuery("(max-width:500px)") ? "small" : "medium"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        size={useMediaQuery("(max-width:500px)") ? "small" : "medium"}
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        style={{ marginTop: "16px" }}
      >
        Change Password
      </Button>
    </div>
  );
}
