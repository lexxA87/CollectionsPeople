import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUserStore } from "../../data/stores/useCurrentUserStore";
import { useCollectionsStore } from "../../data/stores/useCollectionsStore";
import { useDarkTheme } from "../../data/stores/useDarkTheme";
import { getCollections, deleteCollection } from "../../api/collectionAPI";
import CollectionsTable from "./tables/CollectionsTable";
import { Button } from "react-bootstrap";
import CollectionForm from "../forms/CollectionForm";
import UserPageWelcome from "./UserPageWelcome";

function UserPage() {
  const [showCollectionForm, setShowCollectionForm] = useState(false);
  const [collection, setCollection] = useState({
    title: "",
    description: "",
    theme: "",
    _id: "",
  });
  const [isPostColl, setIsPostColl] = useState(false);
  const currentUser = useCurrentUserStore((state) => state.currentUser);
  const setCollections = useCollectionsStore((state) => state.setCollections);
  const collections = useCollectionsStore((state) => state.collections);
  const isDarkTheme = useDarkTheme((state) => state.isDarkTheme);
  const redirect = useNavigate();

  const userId = currentUser.id;
  const { name } = currentUser;

  const getSetCollections = async (userId) => {
    const colls = await getCollections(userId);
    setCollections(colls);
  };

  useEffect(() => {
    getSetCollections(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection]);

  const addNewCollection = () => {
    setShowCollectionForm(true);
    setIsPostColl(true);
  };

  return (
    <>
      <UserPageWelcome userName={name} />
      {!showCollectionForm ? (
        <>
          <div
            className="justify-content-between hstack gap-3 my-3 mx-2"
            bg={isDarkTheme && "dark"}
          >
            <Button variant="success" onClick={() => redirect("/")}>
              <i className="bi bi-arrow-up-square"></i> to main
            </Button>
            <Button variant="success" onClick={addNewCollection}>
              Add New <i className="bi bi-plus-square"></i>
            </Button>
          </div>
          {collections.length ? (
            <CollectionsTable
              collections={collections}
              isDarkTheme={isDarkTheme}
              setShowCollectionForm={setShowCollectionForm}
              setCollection={setCollection}
              deleteCollection={deleteCollection}
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
          isDarkTheme={isDarkTheme}
          userId={userId}
          isPostColl={isPostColl}
          setIsPostColl={setIsPostColl}
        />
      )}
    </>
  );
}

export default UserPage;
