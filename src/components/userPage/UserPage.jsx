import React, { useEffect, useState } from "react";
import { useCurrentUserStore } from "../../data/stores/useCurrentUserStore";
import { useCollectionsStore } from "../../data/stores/useCollectionsStore";
import { useDarkTheme } from "../../data/stores/useDarkTheme";
import { getCollections } from "../../api/collectionAPI";
import CollectionsTable from "./tables/CollectionsTable";
import { useThemesStore } from "../../data/stores/useThemesStore";
import { Button } from "react-bootstrap";
import CollectionForm from "../forms/CollectionForm";
// import ItemForm from "../forms/ItemForm";

function UserPage() {
  const [showCollectionForm, setShowCollectionForm] = useState(false);
  // const [showItemForm, setShowItemForm] = useState(false);
  const [collection, setCollection] = useState();
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const setCollections = useCollectionsStore((state) => state.setCollections);
  // const collectionsForTable = useCollectionsStore(
  //   (state) => state.collectionsForTable
  // );
  // const setCollectionsForTable = useCollectionsStore(
  //   (state) => state.setCollectionsForTable
  // );
  const [collectionsForTable, setCollectionsForTable] = useState({});
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
  }, [collection]);

  const updateCollections = (collections, themes) => {
    collections.forEach((collection) => {
      const themeId = collection.theme;
      const theme = themes.find((el) => el._id === themeId);
      collection.theme = theme;
    });
    return collections;
  };

  return (
    <>
      <h1>UserPage</h1>
      {!showCollectionForm ? (
        <>
          <div className="justify-content-end hstack gap-3 my-3 mx-2">
            <Button variant="success">
              Add New <i className="bi bi-plus-square"></i>
            </Button>
          </div>
          {collectionsForTable.length ? (
            <CollectionsTable
              collections={collectionsForTable}
              isDarkTheme={isDarkTheme}
              setShowCollectionForm={setShowCollectionForm}
              setCollection={setCollection}
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
      ) : (
        <CollectionForm
          setShow={setShowCollectionForm}
          collection={collection}
          setCollection={setCollection}
        />
      )}

      {/* <ItemForm show={showItemForm} setShow={setShowItemForm} /> */}
    </>
  );
}

export default UserPage;
