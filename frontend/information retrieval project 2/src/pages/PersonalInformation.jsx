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
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  maxWidth: "400px",
  margin: "0 auto",
  padding: "20px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  backgroundColor: "#fff",
});

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
    <div>
      <Typography
        variant="h1"
        component="h1"
        gutterBottom
        fontSize={"2em"}
        fontFamily={"Rajdhani"}
        fontWeight={"bold"}
        marginBottom={7}
      >
        Personal Information
      </Typography>

      <label htmlFor="profile-photo-input">
        <CircleAvatar src={profilePhoto} alt="Profile Photo">
          {!profilePhoto && <PhotoCamera />}
        </CircleAvatar>
      </label>
      <input
        id="profile-photo-input"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleProfilePhotoChange}
      />

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
