import React, { useMemo, useCallback } from "react";
import ButtonsActionsTable from "./ButtonsActionsTable";
import Table from "./Table";

function CollectionsTable({
  collections,
  isDarkTheme,
  setShowCollectionForm,
  setCollection,
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
          Cell: ({ row }) => (
            <ButtonsActionsTable
              setShowForm={setShowCollectionForm}
              object={row.original}
              setObject={setCollection}
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
