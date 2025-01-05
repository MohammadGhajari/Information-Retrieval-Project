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
  const { email } = useSelector((state) => state.user);

  const [dataForBarChart, setDataForBarChart] = useState([
    {
      name: "Item a",
      value: 2400,
    },
    {
      name: "item b",
      value: 1398,
    },
    {
      name: "item c",
      value: 9800,
    },
    {
      name: "item d",
      value: 3908,
    },
    {
      name: "item e",
      value: 4800,
    },
    {
      name: "item f",
      value: 3800,
    },
    {
      name: "item g",
      value: 4300,
    },
  ]);
  const [dataForTable, setDataForTable] = useState();
  // const [dataForLineChart, setDataForLineChart] = useState([
  // {
  //   time: "day 1",
  //   data: [
  //     { website: "website1", keyword: "keyword1", value: 100 },
  //     { website: "website1", keyword: "keyword3", value: 200 },
  //     { website: "website2", keyword: "keyword2", value: 150 },
  //     { website: "website3", keyword: "keyword1", value: 150 },
  //   ],
  // },
  //   {
  //     time: "day 2",
  //     data: [
  //       { website: "website1", keyword: "keyword1", value: 150 },
  //       { website: "website1", keyword: "keyword3", value: 250 },
  //       { website: "website2", keyword: "keyword2", value: 350 },
  //       { website: "website3", keyword: "keyword1", value: 250 },
  //     ],
  //   },
  //   {
  //     time: "day 3",
  //     data: [
  //       { website: "website1", keyword: "keyword1", value: 400 },
  //       { website: "website1", keyword: "keyword3", value: 200 },
  //       { website: "website2", keyword: "keyword2", value: 50 },
  //       { website: "website3", keyword: "keyword1", value: 50 },
  //     ],
  //   },
  //   {
  //     time: "day 4",
  //     data: [
  //       { website: "website1", keyword: "keyword1", value: 50 },
  //       { website: "website1", keyword: "keyword3", value: 100 },
  //       { website: "website2", keyword: "keyword2", value: 300 },
  //       { website: "website3", keyword: "keyword1", value: 190 },
  //     ],
  //   },
  //   {
  //     time: "day 5",
  //     data: [
  //       { website: "website1", keyword: "keyword1", value: 200 },
  //       { website: "website1", keyword: "keyword3", value: 300 },
  //       { website: "website2", keyword: "keyword2", value: 400 },
  //       { website: "website3", keyword: "keyword1", value: 350 },
  //     ],
  //   },
  //   {
  //     time: "day 6",
  //     data: [
  //       { website: "website1", keyword: "keyword1", value: 200 },
  //       { website: "website1", keyword: "keyword3", value: 600 },
  //       { website: "website2", keyword: "keyword2", value: 450 },
  //       { website: "website3", keyword: "keyword1", value: 450 },
  //     ],
  //   },
  //   {
  //     time: "day 7",
  //     data: [
  //       { website: "website1", keyword: "keyword1", value: 500 },
  //       { website: "website1", keyword: "keyword3", value: 550 },
  //       { website: "website2", keyword: "keyword2", value: 350 },
  //       { website: "website3", keyword: "keyword1", value: 50 },
  //     ],
  //   },
  // ]);
  const [dataForLineChart, setDataForLineChart] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      const allQueries = await getAllQueries();

      setDataForBarChart([...filterBarChartData(allQueries)]);
      setDataForTable([...filterTableData(allQueries)]);
      setDataForLineChart([...filterLineChartData(allQueries)]);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className={styles["container"]}>
      <h1>Website Analyzer</h1>
      {!isLoading ? (
        <div>
          <CustomBarChart data={dataForBarChart} />
          <CustomTable data={dataForTable} />
          <CustomLineChart data={dataForLineChart} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
