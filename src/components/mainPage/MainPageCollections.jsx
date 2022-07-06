import React, { useEffect, useState } from "react";
import { CardGroup } from "react-bootstrap";
import CollectionCard from "../collection/CollectionCard";
import { getCollectionsSort } from "../../api/collectionAPI";
import { useCollectionsStore } from "../../data/stores/useCollectionsStore";
import Loading from "../helper/Loading";

function MainPageCollections() {
  const collectionsSort = useCollectionsStore((state) => state.collectionsSort);
  const setCollectionsSort = useCollectionsStore(
    (state) => state.setCollectionsSort
  );
  const [isLoading, setLoading] = useState(true);

  const getCollections = async () => {
    setLoading(true);
    const coll = await getCollectionsSort();
    setCollectionsSort(coll);
    setLoading(false);
  };

  useEffect(() => {
    getCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(collectionsSort);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <CardGroup>
          {collectionsSort.map((collection) => (
            <CollectionCard collection={collection} key={collection._id} />
          ))}
        </CardGroup>
      )}
    </>
  );
}

export default MainPageCollections;
