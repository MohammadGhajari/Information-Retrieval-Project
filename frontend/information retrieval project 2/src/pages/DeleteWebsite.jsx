import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import styles from "././../styles/delete-website.module.css";
const ConfirmationModal = ({ open, onClose, onConfirm, website }) => (
  <Modal open={open} onClose={onClose}>
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        width: `${useMediaQuery("(max-width:450px)") ? "330px" : "400px"}`,
      }}
    >
      <Typography variant="h6" component="h2" gutterBottom>
        Confirm Deletion
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Are you sure you want to delete the website "{website}"?
      </Typography>
      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="error" onClick={onConfirm}>
          Delete
        </Button>
      </Box>
    </Box>
  </Modal>
);

const SearchResult = ({ website, onDelete }) => (
  <Card
    sx={{
      mt: 2,
      marginTop: "4rem",
      boxShadow: "var(--shadow-me-sm)",
      border: "1px solid var(--color-grey-5)",
    }}
  >
    <CardContent>
      <Typography variant="h6">{website.name}</Typography>
      <Typography variant="body2" color="text.secondary">
        {website.domain}
      </Typography>
    </CardContent>
    <CardActions>
      <Button
        variant="contained"
        color="error"
        onClick={() => onDelete(website)}
      >
        Delete
      </Button>
    </CardActions>
  </Card>
);

const DeleteWebsite = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [website, setWebsite] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSearch = () => {
    if (searchQuery === "example.com") {
      setWebsite({ name: "Example Website", domain: "example.com" });
    } else {
      setWebsite(null);
    }
  };

  const handleDelete = () => {
    setWebsite(null);
    setModalOpen(false);
  };

  return (
    <Box
      className={styles["container"]}
      sx={{
        marginTop: "4rem",
        width: "35%",
      }}
    >
      <Typography
        variant="h1"
        component="h1"
        gutterBottom
        fontSize={"2em"}
        fontFamily={"Rajdhani"}
        fontWeight={"bold"}
        marginBottom={7}
      >
        Delete Website
      </Typography>
      <Box display="flex" flexDirection={"column"} gap={2} alignItems="center">
        <TextField
          label="Enter website domain"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ boxShadow: "var(--shadow-me-sm" }}
          size={useMediaQuery("(max-width:450px)") ? "small" : "medium"}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{ height: "100%", width: "100%" }}
          size={useMediaQuery("(max-width:450px)") ? "small" : "medium"}
        >
          Search
        </Button>
      </Box>
      {website && (
        <SearchResult website={website} onDelete={() => setModalOpen(true)} />
      )}
      <ConfirmationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
        website={website?.domain}
      />
    </Box>
  );
};

export default DeleteWebsite;
