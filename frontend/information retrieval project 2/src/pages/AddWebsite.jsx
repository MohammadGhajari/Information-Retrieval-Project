import styles from "./../styles/add-website.module.css";
import { TextField, Button, Box } from "@mui/material";
import { IoAddCircleOutline } from "react-icons/io5";

export default function AddWebsite() {
  return (
    <div className={styles["container"]}>
      <h1>Add Website</h1>
      <Box component="form" className={styles["form"]}>
        <TextField
          label="Website Name"
          variant="outlined"
          required
          fullWidth
          style={{ boxShadow: "var(--shadow-me-sm" }}

          // size="small"
        />
        <TextField
          // size="small"
          label="Website Domain"
          variant="outlined"
          required
          fullWidth
          style={{ boxShadow: "var(--shadow-me-sm" }}
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
