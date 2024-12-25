import styles from "./../styles/add-website.module.css";
import { TextField, Button, Box } from "@mui/material";
import { IoAddCircleOutline } from "react-icons/io5";

export default function AddWebsite() {
  return (
    <div className={styles["container"]}>
      <h1>Add Website</h1>
      <p>Add your website name and domain to analyze</p>
      <Box component="form" className={styles["form"]}>
        <TextField
          label="Website Name"
          variant="outlined"
          required
          fullWidth
          size="small"
        />
        <TextField
          size="small"
          label="Website Domain"
          variant="outlined"
          required
          fullWidth
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
