import "./Employees.scss";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";

export default function Employees() {
  const navigate = useNavigate();
  const gridRef = useRef();
  const [rowData, setRowData] = useState();

  // Each Column Definition results in one Column.
  const [columnDefs] = useState([
    { field: "firstName", minWidth: 120, width: 130 },
    { field: "lastName", minWidth: 120, width: 130 },
    { field: "startDate", minWidth: 100, maxWidth: 150 },
    { field: "department", minWidth: 120, width: 150 },
    { field: "birthDate", minWidth: 100, maxWidth: 150 },
    { field: "street", minWidth: 120, width: 180 },
    { field: "city", minWidth: 120, width: 140 },
    { field: "state", minWidth: 70, width: 80 },
    { field: "zipCode", minWidth: 120, maxWidth: 120 },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
    }),
    []
  );

  const containerStyle = useMemo(() => ({ width: "100%", height: "50vh" }), []);
  const gridStyle = useMemo(
    () => ({ height: "100%", width: "100%", overflow: "hidden" }),
    []
  );

  const employees = useMemo(
    () => JSON.parse(localStorage.getItem("employeesList")),
    []
  );

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);

  const onPageSizeChanged = useCallback(() => {
    var value = document.getElementById("page-size").value;
    gridRef.current.api.paginationSetPageSize(Number(value));
  }, []);

  // const onGridReady = useCallback((params) => {
  //   params.api.sizeColumnsToFit();
  //   window.addEventListener("resize", function () {
  //     setTimeout(function () {
  //       params.api.sizeColumnsToFit();
  //     });
  //   });

  //   gridRef.current.api.sizeColumnsToFit();
  // }, []);

  useEffect(() => {
    setRowData(employees);
  }, [employees]);

  return (
    <main className="employees">
      <div className="arrayContainer">
        <div className="arrayContainerHeading">
          <h1 className="arrayContainerHeadingText">Employees List</h1>
          <button
            className="arrayContainerHeadingButton"
            onClick={() => navigate("/")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
              <path d="M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
            </svg>
            Create employee
          </button>
        </div>
        <div className="arrayContainerBody">
          <div className="arrayContainerBodyHeading">
            <div>
              <div className="example-header">
                Show
                <select
                  onChange={onPageSizeChanged}
                  id="page-size"
                  defaultValue="10"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                entries
              </div>
            </div>
            <div>
              <label htmlFor="filter-text-box">Search : </label>
              <input
                type="text"
                id="filter-text-box"
                placeholder="Filter..."
                onInput={onFilterTextBoxChanged}
              />
            </div>
          </div>
          <div style={containerStyle}>
            <div style={gridStyle} className="ag-theme-alpine">
              <AgGridReact
                ref={gridRef} // Ref for accessing Grid's API
                rowData={rowData} // Row Data for Rows
                columnDefs={columnDefs} // Column Defs for Columns
                defaultColDef={defaultColDef} // Default Column Properties
                animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                // onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                pagination={true} // Optional - enables pagination
                paginationPageSize={10} // Optional - sets the page size
                // onGridReady={onGridReady}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
