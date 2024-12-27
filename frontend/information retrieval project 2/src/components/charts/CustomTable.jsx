"use client";
import React, { StrictMode, useMemo, useState } from "react";
import styles from "./../../styles/custom-table.module.css";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

const rowSelection = {
  mode: "multiRow",
  headerCheckbox: true,
};

export default function CustomTable({ data }) {
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
