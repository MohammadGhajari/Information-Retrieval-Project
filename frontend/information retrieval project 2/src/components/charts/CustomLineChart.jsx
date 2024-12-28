import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  ResponsiveContainer,
  Area,
} from "recharts";
import { useState } from "react";
import styles from "./../../styles/custom-line-chart.module.css";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Slider from "@mui/material/Slider";
import { MenuProps, shuffleArray, refactorData } from "../../services/helper";
import { useMediaQuery } from "@mui/material";

let COLORS = [
  "#D51054",
  "#CA9FAD",
  "#C12CDA",
  "#816842",
  "#45FB53",
  "#C18433",
  "#6EC4A0",
  "#712D7A",
  "#824876",
  "#AD5D9F",
  "#60A266",
  "#4890EC",
  "#3F715B",
  "#6DF719",
  "#182CBA",
  "#9C1967",
  "#270A2F",
  "#185435",
  "#8D5E05",
  "#3F09FE",
  "#DDBAAE",
  "#3C0CD6",
  "#5BBCE3",
  "#D67BA6",
  "#B8B3F0",
  "#9A4B1E",
  "#2554BB",
  "#60C03D",
  "#D14510",
  "#96C72A",
  "#C237B2",
  "#D5F780",
  "#B981D8",
  "#6E5C49",
  "#B9FD50",
  "#8CFEFF",
  "#8CAD7E",
  "#A7B551",
  "#AB4C2A",
  "#B61CB4",
  "#8F46D9",
  "#31C957",
  "#8AF98D",
  "#837702",
  "#AC8AFD",
  "#B61865",
  "#B44845",
  "#553021",
  "#6AA9ED",
  "#4D97C8",
];

COLORS = shuffleArray(COLORS);

export default function CustomLineChart({ data }) {
  const [dataForChart, setDataForChart] = useState([...refactorData(data)]);
  const [dataKeys, setDataKeys] = useState([
    ...Object.keys(dataForChart[0]).filter((key) => key !== "time"),
  ]);
  const allDataKeys = Object.keys(refactorData(data)[0]).filter(
    (key) => key !== "time"
  );

  const maxSlider = Math.max(
    ...[...refactorData(data)].map((d) => +d.time.slice(4))
  );
  const minSlider = Math.min(
    ...[...refactorData(data)].map((d) => +d.time.slice(4))
  );

  const handleChangeSelect = (event) => {
    const {
      target: { value },
    } = event;
    setDataKeys(value);
  };

  const [sliderValue, setSliderValueValue] = useState([minSlider, maxSlider]);
  const handleChangeSlider = (event, newValue) => {
    setSliderValueValue(newValue);

    const filteredData = [];
    [...refactorData(data)].forEach((d) => {
      if (newValue[0] <= +d.time.slice(4) && +d.time.slice(4) <= newValue[1]) {
        filteredData.push(d);
      }
    });
    setDataForChart(filteredData);
  };

  return (
    <div className={styles["container"]}>
      <h2>Keyword rank changes</h2>
      <div
        style={{
          width: "93%",
          marginLeft: "1rem",
        }}
      >
        <h3>Time range filter</h3>
        <Slider
          min={minSlider}
          max={maxSlider}
          value={sliderValue}
          onChange={handleChangeSlider}
          valueLabelDisplay="auto"
        />
      </div>
      <FormControl>
        <InputLabel id="demo-multiple-checkbox-label" size="small">
          Items
        </InputLabel>
        <Select
          size="small"
          style={{ boxShadow: "var(--shadow-me-sm" }}
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={dataKeys}
          onChange={handleChangeSelect}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selectedItems) => selectedItems.join(", ")}
          MenuProps={MenuProps}
        >
          {allDataKeys.map((d) => (
            <MenuItem key={d} value={d}>
              <Checkbox checked={dataKeys.includes(d)} />
              <ListItemText primary={d} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* 
      <AreaChart
        width={950}
        height={300}
        data={dataForChart}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        {dataKeys.map((key, i) => (
          <Area
            key={key}
            type="monotone"
            dataKey={key}
            stroke={COLORS[i % COLORS.length]}
            fill={COLORS[i % COLORS.length]}
            strokeWidth={3}
            fillOpacity={0.3}
          />
        ))}
      </AreaChart> */}
      <ResponsiveContainer height={300} width={"100%"}>
        <LineChart
          // width={950}
          // height={300}
          data={dataForChart}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          {!useMediaQuery("(max-width:500px)") && <YAxis />}
          <Tooltip />
          <Legend />
          {dataKeys.map((key, i) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={COLORS[i % COLORS.length]}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
