import React from "react";
import { useSortBy, useTable } from "react-table";
import BootstrapTable from "react-bootstrap/Table";
import { NavLink } from "react-router-dom";

function Table({ columns, data, isDarkTheme }) {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  return (
    <BootstrapTable
      striped
      bordered
      hover
      variant={isDarkTheme ? "dark" : "light"}
      {...getTableProps()}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="table-group-divider">
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                console.log(cell);
                return (
                  <td {...cell.getCellProps()}>
                    {cell.column.Header === "Name" ? (
                      <NavLink to="/">{cell.render("Cell")}</NavLink>
                    ) : (
                      cell.render("Cell")
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </BootstrapTable>
  );
}

export default Table;
