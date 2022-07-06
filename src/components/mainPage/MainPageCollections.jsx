import React, { useEffect, useState } from "react";
import { useDarkTheme } from "../../data/stores/useDarkTheme";
import { Tabs, Tab, Card, Row, Col } from "react-bootstrap";
import CollectionCard from "../collection/CollectionCard";
import { getCollectionsSort } from "../../api/collectionAPI";
import { useCollectionsStore } from "../../data/stores/useCollectionsStore";
import Loading from "../helper/Loading";
import { Link } from "react-router-dom";

function MainPageCollections() {
  const isDarkTheme = useDarkTheme((state) => state.isDarkTheme);

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

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Tabs
            defaultActiveKey="collection"
            id="tab_collection"
            className="mb-3"
          >
            <Tab
              eventKey="collection"
              title="The bigest collections"
              tabClassName={isDarkTheme ? "text-bg-dark" : ""}
              disabled
            >
              <Row xs={1} md={3} className="g-4">
                {collectionsSort.map((collection) => (
                  <Col key={collection._id}>
                    <CollectionCard collection={collection} />
                  </Col>
                ))}
                <Col>
                  <Card
                    bg={isDarkTheme ? "dark" : "light"}
                    text={isDarkTheme ? "white" : "dark"}
                  >
                    <Card.Img
                      variant="top"
                      src="/images/right-arrow.png"
                      className="p-5"
                    />
                    <Card.Body>
                      <Card.Title className="text-warning text-center">
                        <Link
                          to="/collections"
                          style={{
                            color: "inherit",
                            textDecoration: "inherit",
                          }}
                        >
                          View more...
                        </Link>
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </>
      )}
    </>
  );
}

export default MainPageCollections;
