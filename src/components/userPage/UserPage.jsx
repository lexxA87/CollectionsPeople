import React, { useEffect } from "react";
import { useCurrentUserStore } from "../../data/stores/useCurrentUserStore";
import { useCollectionsStore } from "../../data/stores/useCollectionsStore";
import { useDarkTheme } from "../../data/stores/useDarkTheme";
import { getCollections } from "../../api/collectionAPI";
import CollectionsTable from "./tables/CollectionsTable";

function UserPage() {
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const collections = useCollectionsStore((state) => state.collections);
  const setCollections = useCollectionsStore((state) => state.setCollections);
  const isDarkTheme = useDarkTheme((state) => state.isDarkTheme);

  const userId = currentUser.id;

  const getSetCollections = async (userId) => {
    const colls = await getCollections(userId);
    setCollections(colls);
  };

  useEffect(() => {
    getSetCollections(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>UserPage</h1>
      <CollectionsTable collections={collections} isDarkTheme={isDarkTheme} />
    </>
  );
}

export default UserPage;
