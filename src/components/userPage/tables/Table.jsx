import React, { Fragment } from "react";
import { useSortBy, useTable, useExpanded } from "react-table";
import BootstrapTable from "react-bootstrap/Table";

function Table({ columns, data, isDarkTheme }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy,
      useExpanded
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
        {headerGroups.map((headerGroup, i) => (
          <tr key={i} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, i) => (
              <th
                key={i}
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className="table-group-divider">
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <Fragment key={i}>
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  if (cell.column.Header === "Name") {
                    if (isDarkTheme) {
                      return (
                        <td className="text-warning" {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      );
                    } else {
                      return (
                        <td className="text-success" {...cell.getCellProps()}>
                          <b>{cell.render("Cell")}</b>
                        </td>
                      );
                    }
                  } else {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  }
                })}
              </tr>
            </Fragment>
          );
        })}
      </tbody>
    </BootstrapTable>
  );
}

export default Table;
