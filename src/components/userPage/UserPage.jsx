import React, { useEffect } from "react";
import { useCurrentUserStore } from "../../data/stores/useCurrentUserStore";
import { useCollectionsStore } from "../../data/stores/useCollectionsStore";
import { useDarkTheme } from "../../data/stores/useDarkTheme";
import { getCollections } from "../../api/collectionAPI";
import CollectionsTable from "./tables/CollectionsTable";
import { useThemesStore } from "../../data/stores/useThemesStore";
import { Button } from "react-bootstrap";

function UserPage() {
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const setCollections = useCollectionsStore((state) => state.setCollections);
  const collectionsForTable = useCollectionsStore(
    (state) => state.collectionsForTable
  );
  const setCollectionsForTable = useCollectionsStore(
    (state) => state.setCollectionsForTable
  );
  const isDarkTheme = useDarkTheme((state) => state.isDarkTheme);
  const themes = useThemesStore((state) => state.themes);

  const userId = currentUser.id;

  const getSetCollections = async (userId) => {
    const colls = await getCollections(userId);
    setCollections(colls);
    setCollectionsForTable(updateCollections(colls, themes));
  };

  useEffect(() => {
    getSetCollections(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateCollections = (collections, themes) => {
    collections.forEach((collection) => {
      const themeId = collection.theme;
      const theme = themes.find((el) => el._id === themeId);
      collection.theme = theme.name;
      collection.items = collection.items.length;
    });
    return collections;
  };

  return (
    <>
      <h1>UserPage</h1>
      <div className="justify-content-end hstack gap-3 my-3 mx-2">
        <Button variant="success">
          NEW <i class="bi bi-plus-square"></i>
        </Button>
      </div>
      {collectionsForTable.length ? (
        <CollectionsTable
          collections={collectionsForTable}
          isDarkTheme={isDarkTheme}
        />
      ) : (
        <div
          className={
            isDarkTheme ? "text-center text-info bg-dark" : "text-center"
          }
        >
          You don't have any collections. Please, create it to press "NEW+"
        </div>
      )}
    </>
  );
}

export default UserPage;
