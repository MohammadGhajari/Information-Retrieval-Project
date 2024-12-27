import styles from "./../styles/add-keyword.module.css";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { TextField } from "@mui/material";
import { PiUploadSimpleLight } from "react-icons/pi";
import { MdInsertPhoto } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaFileCsv } from "react-icons/fa";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FormControl from "@mui/material/FormControl";

import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
export default function AddKeyword() {
  const [file, setFile] = useState(null);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  function handleChangeUpload(e) {
    setFile(e.target.files[0]);
  }
  function handleDeleteFile() {
    setFile(null);
  }

  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div className={styles["container"]}>
      <h1>Add keyword for website</h1>
      <form>
        <FormControl>
          <InputLabel id="demo-multiple-checkbox-label" size="small">
            Website
          </InputLabel>
          <Select
            required={true}
            style={{ boxShadow: "var(--shadow-me-sm" }}
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={personName.includes(name)} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Keyword"
          variant="outlined"
          required
          fullWidth
          style={{ boxShadow: "var(--shadow-me-sm" }}
        />
        <div className={styles["file-upload-container"]}>
          <label>Upload file (optional):</label>
          <div className={styles["file-picker-container"]}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput type="file" onChange={handleChangeUpload} />
            </Button>
            {file && (
              <div className={styles["file-content"]}>
                <span>
                  <FaFileCsv />
                </span>
                <span>
                  <RiDeleteBin6Line onClick={handleDeleteFile} />
                </span>
              </div>
            )}
          </div>
        </div>
        <Button variant="contained" color="primary" size="large">
          Add Keyword
        </Button>
      </form>
    </div>
  );
}
