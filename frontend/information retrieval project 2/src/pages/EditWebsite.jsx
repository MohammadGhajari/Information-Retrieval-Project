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
import styles from "./../styles/edit-website.module.css";
import { useMediaQuery } from "@mui/material";
import { toastError, toastSuccess } from "./../services/notify";
import { isValidDomain } from "../services/helper";

const ConfirmationModal = ({ open, onClose, onConfirm, website }) => (
  <Modal open={open} onClose={onClose}>
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: `${useMediaQuery("(max-width:450px)") ? "330px" : "400px"}`,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" component="h2" gutterBottom>
        Confirm Changes
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Are you sure you want to save the changes for "{website.name}"?
      </Typography>
      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={onConfirm}>
          Save
        </Button>
      </Box>
    </Box>
  </Modal>
);

const EditFields = ({ website, onSave }) => {
  const [editedName, setEditedName] = useState(website.name);
  const [editedDomain, setEditedDomain] = useState(website.domain);

  return (
    <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Website Name"
        variant="outlined"
        value={editedName}
        onChange={(e) => setEditedName(e.target.value)}
        size={useMediaQuery("(max-width:450px)") ? "small" : "medium"}
      />
      <TextField
        label="Website Domain"
        variant="outlined"
        value={editedDomain}
        onChange={(e) => setEditedDomain(e.target.value)}
        size={useMediaQuery("(max-width:450px)") ? "small" : "medium"}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => onSave(editedName, editedDomain)}
      >
        Save
      </Button>
    </Box>
  );
};

const SearchResult = ({ website, onEdit }) => (
  <Card
    sx={{
      mt: 2,
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
      <Button variant="contained" onClick={onEdit}>
        Edit
      </Button>
    </CardActions>
  </Card>
);

const EditWebsite = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [website, setWebsite] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [updatedWebsite, setUpdatedWebsite] = useState(null);

  // fetch website
  function handleSearch() {
    setWebsite(null);

    if (!searchQuery) return toastError("provide a search query");

    //check if website with this domain exists
    if (searchQuery === "example.com") {
      setWebsite({ name: "Example Website", domain: "example.com" });
      setSearchQuery("");
    } else {
      setWebsite(null);
    }
  }

  const handleEditSave = (name, domain) => {
    if (!name || !domain) return;

    if (!isValidDomain(domain)) return toastError("Enter a valid domain");

    setUpdatedWebsite({ name, domain });
    setModalOpen(true);
  };

  const handleSave = () => {
    setWebsite(null);
    setUpdatedWebsite(null);
    setModalOpen(false);
    setIsEditing(false);

    toastSuccess("Website updated successfully");
  };

  return (
    <Box
      sx={{ marginTop: "4rem", width: "35%" }}
      className={styles["container"]}
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
        Edit Website
      </Typography>
      <Box
        component={"form"}
        display="flex"
        flexDirection={"column"}
        gap={2}
        alignItems="center"
      >
        <TextField
          label="Enter website domain"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size={useMediaQuery("(max-width:450px)") ? "small" : "medium"}
          required={true}
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
      {website && !isEditing && (
        <SearchResult website={website} onEdit={() => setIsEditing(true)} />
      )}
      {website && isEditing && (
        <EditFields website={website} onSave={handleEditSave} />
      )}
      <ConfirmationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleSave}
        website={updatedWebsite || {}}
      />
    </Box>
  );
};

export default EditWebsite;
