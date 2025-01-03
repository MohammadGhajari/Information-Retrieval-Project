"use client";
import React, { StrictMode, useMemo, useState } from "react";
import styles from "./../../styles/custom-table.module.css";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
// import { themeBalham } from "ag-grid-community";
import {
  themeQuartz,
  colorSchemeDark,
  iconSetMaterial,
} from "ag-grid-community";
import { useSelector } from "react-redux";
import { themeAlpine } from "ag-grid-community";

const myTheme = themeQuartz.withPart(colorSchemeDark);

// const myTheme = themeQuartz.withParams({
//   backgroundColor: "rgb(249, 245, 227)",
//   foregroundColor: "rgb(126, 46, 132)",
//   headerTextColor: "rgb(204, 245, 172)",
//   headerBackgroundColor: "rgb(209, 64, 129)",
//   oddRowBackgroundColor: "rgb(0, 0, 0, 0.03)",
//   headerColumnResizeHandleColor: "rgb(126, 46, 132)",
// });
ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: true,
};

export default function CustomTable({ data }) {
  const { isDarkMode } = useSelector((state) => state.darkMode);

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "keyWord",
    },
    { field: "website" },
    { field: "minRank", filter: "agNumberColumnFilter" },
    { field: "maxRank", filter: "agNumberColumnFilter" },
    {
      field: "avgRank",
      filter: "agNumberColumnFilter",
    },
    {
      field: "checkCount",
      filter: "agNumberColumnFilter",
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
    };
  }, []);

  return (
    <div className={styles["container"]}>
      <h2>Keyword data table</h2>
      <AgGridReact
        theme={isDarkMode ? myTheme : themeAlpine}
        rowData={data}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection={rowSelection}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50]}
      />
    </div>
  );
}
