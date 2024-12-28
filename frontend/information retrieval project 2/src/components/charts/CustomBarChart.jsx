import React, { PureComponent } from "react";
import styles from "./../../styles/custom-bar-chart.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { MenuProps } from "../../services/helper";
import { useMediaQuery } from "@mui/material";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles["custom-tooltip"]}>
        <p className="label">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default function CustomBarChart({ data }) {
  const [shownData, setShownData] = useState([...data]);
  const names = data.map((d) => d.name);
  const [selectedItems, setSelectedItems] = useState([...names]);

  const handleChangeSelect = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedItems(typeof value === "string" ? value.split(",") : value);

    const filteredData = [];
    for (let i = 0; i < data.length; i++)
      for (let j = 0; j < value.length; j++)
        if (data[i].name === value[j]) filteredData.push(data[i]);

    setShownData([...filteredData]);
  };
  return (
    <div className={styles["container"]}>
      <h2>The number of checks performed for each query</h2>
      <FormControl>
        <InputLabel id="demo-multiple-checkbox-label" size="small">
          Website
        </InputLabel>
        <Select
          size="small"
          style={{ boxShadow: "var(--shadow-me-sm" }}
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedItems}
          onChange={handleChangeSelect}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={selectedItems.includes(name)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={shownData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          {!useMediaQuery("(max-width:450px)") && <YAxis />}
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" barSize={50} fill={"#8884d8"} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
