import React, { useMemo } from "react";
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
                to={`/collection/${row.original._id}`}
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

  return <Table columns={columns} data={data} isDarkTheme={isDarkTheme} />;
}

export default CollectionsTable;
