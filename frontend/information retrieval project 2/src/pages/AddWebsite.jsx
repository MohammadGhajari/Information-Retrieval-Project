import styles from "./../styles/add-website.module.css";
import { TextField, Button, Box } from "@mui/material";
import { IoAddCircleOutline } from "react-icons/io5";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { isValidDomain } from "../services/helper";
import { toastError } from "./../services/notify";
import { addWebsite } from "../services/handleRequests";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function AddWebsite() {
  const [websiteName, setWebsiteName] = useState("");
  const [websiteDomain, setWebsiteDomain] = useState("");
  const { email } = useSelector((state) => state.user);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isValidDomain(websiteDomain)) return toastError("Invalid domain");

    // pass
    const data = {
      domain: websiteDomain,
      name: websiteName,
    };

    const res = await toast.promise(addWebsite(data), {
      pending: "Creating website...🕑",
      success: `Website added successfully✅`,
      error: "Try again.⚠️",
    });

    if (res === "success") {
      setWebsiteDomain("");
      setWebsiteName("");
    }
  }
  return (
    <div className={styles["container"]}>
      <h1>Add Website</h1>
      <Box component="form" className={styles["form"]} onSubmit={handleSubmit}>
        <TextField
          label="Website Name"
          variant="outlined"
          required
          fullWidth
          style={{ boxShadow: "var(--shadow-me-sm" }}
          size={useMediaQuery("(max-width:450px)") ? "small" : "medium"}
          onChange={(e) => setWebsiteName(e.target.value)}
          value={websiteName}
        />

        <TextField
          size={useMediaQuery("(max-width:450px)") ? "small" : "medium"}
          label="Website Domain"
          variant="outlined"
          required
          fullWidth
          style={{ boxShadow: "var(--shadow-me-sm" }}
          onChange={(e) => setWebsiteDomain(e.target.value)}
          value={websiteDomain}
        />
        <Button type="submit" variant="contained" color="primary">
          <span>
            <IoAddCircleOutline />
          </span>
          <span>Add Website</span>
        </Button>
      </Box>
    </div>
  );
}
