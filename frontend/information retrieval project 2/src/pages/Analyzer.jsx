import CustomBarChart from "../components/charts/CustomBarChart";
import CustomTable from "../components/charts/CustomTable";
import CustomLineChart from "../components/charts/CustomLineChart";
import styles from "./../styles/analyzer.module.css";

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
export default function Analyzer() {
  const dataForBarChart = [
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
  ];
  const dataForTable = [
    {
      keyWord: "Tesla",
      website: "test.com",
      minRank: 2,
      maxRank: 10,
      avgRank: 4,
      checkCount: 10,
    },
    {
      keyWord: "harry potter",
      website: "hary.com",
      minRank: 5,
      maxRank: 50,
      avgRank: 15,
      checkCount: 15,
    },
    {
      keyWord: "harry potter",
      website: "hary.com",
      minRank: 5,
      maxRank: 50,
      avgRank: 15,
      checkCount: 15,
    },
    {
      keyWord: "harry potter",
      website: "hary.com",
      minRank: 5,
      maxRank: 50,
      avgRank: 15,
      checkCount: 15,
    },
    {
      keyWord: "ring of power",
      website: "ring.ir",
      minRank: 1,
      maxRank: 16,
      avgRank: 5,
      checkCount: 12,
    },
    {
      keyWord: "ring of power",
      website: "ring.ir",
      minRank: 1,
      maxRank: 16,
      avgRank: 5,
      checkCount: 12,
    },
    {
      keyWord: "ring of power",
      website: "ring.ir",
      minRank: 1,
      maxRank: 16,
      avgRank: 5,
      checkCount: 12,
    },
    {
      keyWord: "ring of power",
      website: "ring.ir",
      minRank: 1,
      maxRank: 16,
      avgRank: 5,
      checkCount: 12,
    },
    {
      keyWord: "Tesla",
      website: "test.com",
      minRank: 2,
      maxRank: 10,
      avgRank: 4,
      checkCount: 10,
    },
    {
      keyWord: "Tesla",
      website: "test.com",
      minRank: 2,
      maxRank: 10,
      avgRank: 4,
      checkCount: 10,
    },
  ];

  const dataForLineChart = [
    {
      time: "day 1",
      data: [
        { website: "website1", keyword: "keyword1", value: 100 },
        { website: "website1", keyword: "keyword3", value: 200 },
        { website: "website2", keyword: "keyword2", value: 150 },
        { website: "website3", keyword: "keyword1", value: 150 },
      ],
    },
    {
      time: "day 2",
      data: [
        { website: "website1", keyword: "keyword1", value: 150 },
        { website: "website1", keyword: "keyword3", value: 250 },
        { website: "website2", keyword: "keyword2", value: 350 },
        { website: "website3", keyword: "keyword1", value: 250 },
      ],
    },
    {
      time: "day 3",
      data: [
        { website: "website1", keyword: "keyword1", value: 400 },
        { website: "website1", keyword: "keyword3", value: 200 },
        { website: "website2", keyword: "keyword2", value: 50 },
        { website: "website3", keyword: "keyword1", value: 50 },
      ],
    },
    {
      time: "day 4",
      data: [
        { website: "website1", keyword: "keyword1", value: 50 },
        { website: "website1", keyword: "keyword3", value: 100 },
        { website: "website2", keyword: "keyword2", value: 300 },
        { website: "website3", keyword: "keyword1", value: 190 },
      ],
    },
    {
      time: "day 5",
      data: [
        { website: "website1", keyword: "keyword1", value: 200 },
        { website: "website1", keyword: "keyword3", value: 300 },
        { website: "website2", keyword: "keyword2", value: 400 },
        { website: "website3", keyword: "keyword1", value: 350 },
      ],
    },
    {
      time: "day 6",
      data: [
        { website: "website1", keyword: "keyword1", value: 200 },
        { website: "website1", keyword: "keyword3", value: 600 },
        { website: "website2", keyword: "keyword2", value: 450 },
        { website: "website3", keyword: "keyword1", value: 450 },
      ],
    },
    {
      time: "day 7",
      data: [
        { website: "website1", keyword: "keyword1", value: 500 },
        { website: "website1", keyword: "keyword3", value: 550 },
        { website: "website2", keyword: "keyword2", value: 350 },
        { website: "website3", keyword: "keyword1", value: 50 },
      ],
    },
  ];

  return (
    <div className={styles["container"]}>
      <h1>Website Analyzer</h1>
      <CustomBarChart data={dataForBarChart} />
      <CustomTable data={dataForTable} />
      <CustomLineChart data={dataForLineChart} />
    </div>
  );
}
