import CustomBarChart from "../components/charts/CustomBarChart";
import CustomTable from "../components/charts/CustomTable";
import CustomLineChart from "../components/charts/CustomLineChart";
import styles from "./../styles/analyzer.module.css";
import Loader from "./../components/loaders/Loader";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllQueries } from "../services/handleRequests";
import {
  filterBarChartData,
  filterTableData,
  filterLineChartData,
} from "../services/helper";

function transformServerData(serverData) {
  return serverData.map((entry) => ({
    time: entry.hour, // Convert hour to 'time'
    data: entry.siteDominAndQuery.map((item) => ({
      website: item.siteDomin, // Rename siteDomin to website
      keyword: item.query, // Rename query to keyword
      value: item.rank, // Rename rank to value
    })),
  }));
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
export default function Analyzer() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDataExists, setIsDataExists] = useState(false);

  const [dataForBarChart, setDataForBarChart] = useState([]);
  const [dataForTable, setDataForTable] = useState();
  const [dataForLineChart, setDataForLineChart] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      const allQueries = await getAllQueries();
      if (allQueries.length > 0) {
        setIsDataExists(true);
        setDataForBarChart([...filterBarChartData(allQueries)]);
        setDataForTable([...filterTableData(allQueries)]);
        setDataForLineChart([...filterLineChartData(allQueries)]);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className={styles["container"]}>
      <h1>Website Analyzer</h1>
      {!isLoading ? (
        isDataExists ? (
          <div>
            <CustomBarChart data={dataForBarChart} />
            <CustomTable data={dataForTable} />
            <CustomLineChart data={dataForLineChart} />
          </div>
        ) : (
          <h1 style={{ alignSelf: "center" }}>There is no data</h1>
        )
      ) : (
        <Loader />
      )}
    </div>
  );
}
