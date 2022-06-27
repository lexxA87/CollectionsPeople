import React, { useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import ButtonsActionsTable from "./ButtonsActionsTable";
import Table from "./Table";

function CollectionsTable({
  collections,
  isDarkTheme,
  setShowCollectionForm,
  setCollection,
  deleteCollection,
}) {
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
              <Link
                to={`/collection:${row.original._id}`}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                {row.original.title}
              </Link>
            );
          },
        },
        {
          Header: "Theme",
          accessor: "theme",
          Cell: ({ row }) => <>{row.original.theme.name}</>,
        },
        {
          Header: "Description",
          accessor: "description",
        },
        {
          Header: "Items",
          accessor: "items",
          Cell: ({ row }) => <>{row.original.items.length}</>,
        },
        {
          Header: "Actions",
          accessor: "buttons",
          Cell: ({ row }) => (
            <ButtonsActionsTable
              setShowForm={setShowCollectionForm}
              object={row.original}
              setObject={setCollection}
              subInfo={row}
              deleteObject={deleteCollection}
            />
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
