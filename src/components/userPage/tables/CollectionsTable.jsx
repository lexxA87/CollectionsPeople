import React, { useMemo, useCallback } from "react";
import { Button } from "react-bootstrap";
import Table from "./Table";

function CollectionsTable({ collections, isDarkTheme }) {
  const structureTable = [
    {
      Header: "My Collections",
      columns: [
        {
          Header: "Name",
          id: "expander",
          accessor: "title",
          Cell: ({ row }) => {
            return (
              <div {...row.getToggleRowExpandedProps()}>
                {row.original.title}
              </div>
            );
          },
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

  const renderRowSubComponent = useCallback(
    ({ row }) => (
      <pre
        style={{
          fontSize: "10px",
        }}
      >
        <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
      </pre>
    ),
    []
  );

  return (
    <Table
      columns={columns}
      data={data}
      isDarkTheme={isDarkTheme}
      renderRowSubComponent={renderRowSubComponent}
    />
  );
}

export default CollectionsTable;
