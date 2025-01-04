import styles from "./../styles/add-keyword.module.css";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
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
import { extractParenthesesContent, MenuProps } from "../services/helper";
import { useMediaQuery } from "@mui/material";
import { toastError } from "./../services/notify";
import { styled } from "@mui/material/styles";
import Loader from "./../components/loaders/Loader";
import {
  createKeywords,
  getAllWebsites,
  uploadKeywords,
} from "../services/handleRequests";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import FormControlLabel from "@mui/material/FormControlLabel";

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
  const isSmallScreen = useMediaQuery("(max-width:500px)");

  const { email } = useSelector((state) => state.user);

  const [file, setFile] = useState(null);
  const [keywordValue, setKeywordValue] = useState("");
  const [allWebsites, setAllWebsites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadByFile, setUploadByFile] = useState(false);
  const [selectedWebsites, setSelectedWebsites] = useState([]);

  function handleChangeUpload(e) {
    setFile(e.target.files[0]);
  }
  function handleDeleteFile() {
    setFile(null);
  }
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedWebsites(typeof value === "string" ? value.split(",") : value);
  };
  function handleChangeCheckbox() {
    setUploadByFile(!uploadByFile);
    setSelectedWebsites([]);
    setKeywordValue("");
    setFile(null);
  }
  async function handleSubmit(e) {
    e.preventDefault();

    if (uploadByFile) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await toast.promise(uploadKeywords(formData), {
        pending: "Uploading file...🕑",
        success: "File uploaded✅",
        error: "Try again⚠️",
      });

      if (res === "success") {
        setKeywordValue("");
        setSelectedWebsites([]);
        setFile(null);
        setUploadByFile(false);
      }
      return;
    } else {
      if (selectedWebsites.length === 0)
        return toastError("Please select a website");

      const dataToSent = {
        websites: extractParenthesesContent(selectedWebsites),
        name: keywordValue,
        file: file,
      };

      const res = await toast.promise(createKeywords(dataToSent), {
        pending: "Adding keywords...🕑",
        success: "Keywords added successfully✅",
        error: "Try again⚠️",
      });

      if (res === "success") {
        setKeywordValue("");
        setSelectedWebsites([]);
      }
    }
  }

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      const res = await getAllWebsites({ email });
      if (res.length > 0) {
        const tempData = [];
        for (let i = 0; i < res.length; i++) {
          const sample = `${res[i].name}(${res[i].domain})`;
          tempData.push(sample);
        }
        setAllWebsites(...[tempData]);
      }

      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div className={styles["container"]}>
      <h1 style={{ color: "var(--color-grey-3)" }}>Add keyword for website</h1>
      {!isLoading ? (
        <form>
          <FormControl>
            <InputLabel id="demo-multiple-checkbox-label" size="small">
              Website
            </InputLabel>
            <Select
              size={isSmallScreen ? "small" : "medium"}
              required={true}
              style={{ boxShadow: "var(--shadow-me-sm" }}
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={selectedWebsites}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
              disabled={uploadByFile}
            >
              {allWebsites.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={selectedWebsites.includes(name)} />
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
            size={isSmallScreen ? "small" : "medium"}
            onChange={(e) => setKeywordValue(e.target.value)}
            value={keywordValue}
            disabled={uploadByFile}
          />

          <FormControlLabel
            control={
              <Checkbox
                onChange={handleChangeCheckbox}
                checked={uploadByFile}
              />
            }
            label="Upload file"
          />

          {uploadByFile && (
            <div className={styles["file-upload-container"]}>
              <div className={styles["file-picker-container"]}>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleChangeUpload}
                  />
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
          )}
          <Button
            variant="contained"
            color="primary"
            size={isSmallScreen ? "medium" : "large"}
            onClick={handleSubmit}
          >
            Add Keyword
          </Button>
        </form>
      ) : (
        <Loader />
      )}
    </div>
  );
}
