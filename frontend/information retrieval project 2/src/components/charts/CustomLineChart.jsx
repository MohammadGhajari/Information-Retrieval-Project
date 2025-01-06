import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import { shuffleArray, MenuProps } from "../../services/helper";
import styles from "./../../styles/custom-line-chart.module.css";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import Select from "@mui/material/Select";

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
  let allDataKeys = [];
  for (let i = 0; i < data.length; i++) {
    const tempKeys = Object.keys(data[i]);
    allDataKeys.push(...tempKeys);
  }
  allDataKeys = [...new Set(allDataKeys)].filter((key) => key !== "time");

  const [dataKeys, setDataKeys] = useState([...allDataKeys]);

  const handleChangeSelect = (event) => {
    const {
      target: { value },
    } = event;
    setDataKeys(value);
  };

  return (
    <div className={styles["container"]}>
      <h2>Keyword rank changes</h2>
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
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <Brush
            dataKey="time"
            height={20}
            stroke="var(--color-primary-tint-1)"
          />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            tickFormatter={(time) => format(parseISO(time), "HH:mm")}
          />
          <YAxis />
          <Tooltip
            labelFormatter={(time) =>
              format(parseISO(time), "yyyy-MM-dd HH:mm")
            }
          />
          <Legend />

          {dataKeys.map((key, i) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={COLORS[i % COLORS.length]}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
