import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { useMediaQuery } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import styles from "./../styles/personal-information.module.css";
const CircleAvatar = styled(Avatar)({
  width: "150px",
  height: "150px",
  marginBottom: "20px",
  cursor: "pointer",
  backgroundColor: "#ccc",
});

export default function PersonalInformation() {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [userName, setUserName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const handleProfilePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles["container"]}>
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
        Personal Information
      </Typography>

      <div className={styles["profile-container"]}>
        <label htmlFor="profile-photo-input">
          <CircleAvatar src={profilePhoto} alt="Profile Photo">
            {!profilePhoto && <PhotoCamera />}
          </CircleAvatar>
        </label>
        <input
          id="profile-photo-input"
          type="file"
          accept="image/*"
          onChange={handleProfilePhotoChange}
          style={{
            display: "none",
          }}
        />
      </div>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          marginBottom: "16px",
        }}
      >
        <TextField
          label="User Name"
          variant="outlined"
          value={userName}
          disabled={!isEditingName}
          onChange={(e) => setUserName(e.target.value)}
          fullWidth
          style={{ boxShadow: "var(--shadow-me-sm" }}
          size={useMediaQuery("(max-width:500px)") ? "small" : "medium"}
        />
        <Button
          variant="text"
          color="primary"
          onClick={() => setIsEditingName(!isEditingName)}
          sx={{ marginLeft: "8px" }}
        >
          {isEditingName ? "Save" : "Edit"}
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          marginTop: "2.2rem",
        }}
      >
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          disabled={!isEditingEmail}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          style={{ boxShadow: "var(--shadow-me-sm" }}
          size={useMediaQuery("(max-width:500px)") ? "small" : "medium"}
        />
        <Button
          variant="text"
          color="primary"
          onClick={() => setIsEditingEmail(!isEditingEmail)}
          sx={{ marginLeft: "8px" }}
        >
          {isEditingEmail ? "Save" : "Edit"}
        </Button>
      </Box>
    </div>
  );
}
