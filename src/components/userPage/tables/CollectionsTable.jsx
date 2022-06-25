import React, { useMemo } from "react";
import Table from "./Table";

function CollectionsTable({ collections, isDarkTheme }) {
  const structureTable = [
    {
      Header: "My Collections",
      columns: [
        {
          Header: "Name",
          accessor: "title",
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
      ],
    },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = useMemo(() => structureTable, []);
  const data = useMemo(() => collections, [collections]);

  return <Table columns={columns} data={data} isDarkTheme={isDarkTheme} />;
}

export default CollectionsTable;
