import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Table from "./Table";

function CollectionsTable({ collections, isDarkTheme }) {
  const structureTable = [
    {
      Header: "My Collections",
      columns: [
        {
          Header: "Name",
          accessor: "title",
          Cell: ({ cell }) => (
            <Link to="/" style={{ textDecoration: "none", color: "green" }}>
              {cell.row.values.title}
            </Link>
          ),
        },
        {
          Header: "Theme",
          accessor: "theme",
        },
        {
          Header: "Description",
          accessor: "description",
        },
        {
          Header: "Items",
          accessor: "items",
        },
        {
          Header: "Actions",
          accessor: "buttons",
          Cell: ({ cell }) => (
            <div className="text-center">
              <Button size="sm" variant="outline-success" className="me-2">
                <i class="bi bi-pencil-square"></i> Edit
              </Button>
              <Button size="sm" variant="outline-danger">
                <i class="bi bi-trash3"></i>
              </Button>
            </div>
          ),
        },
      ],
    },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = useMemo(() => structureTable, []);
  const data = useMemo(() => collections, [collections]);

  return <Table columns={columns} data={data} isDarkTheme={isDarkTheme} />;
}

export default CollectionsTable;
