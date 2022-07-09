import React, { useEffect, useState } from "react";
import { getItemsSortByTag } from "../../api/itemsAPI";
import Loading from "../helper/Loading";
import ItemCard from "../item/ItemCard";
import { useParams } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import { useDarkTheme } from "../../data/stores/useDarkTheme";
import { useCurrentUserStore } from "../../data/stores/useCurrentUserStore";
import CollectionPageHeader from "../collection/CollectionPageHeader";
import NotFound from "../helper/NotFound";

function SearchPage() {
  const isAuth = useCurrentUserStore((state) => state.isAuth);
  const isDarkTheme = useDarkTheme((state) => state.isDarkTheme);
  const [isLoading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const params = useParams();
  const tagID = params.id;

  const getItems = async (id) => {
    const items = await getItemsSortByTag(id);
    setItems(items);
    setLoading(false);
  };

  console.log(items);

  useEffect(() => {
    getItems(tagID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Card
        className="mb-3"
        bg={isDarkTheme ? "dark" : "light"}
        text={isDarkTheme ? "white" : "dark"}
      >
        <Card.Header>
          <CollectionPageHeader isAuth={isAuth} />
        </Card.Header>
      </Card>
      {items.length ? (
        <>
          <Row xs={1} md={3} className="g-4">
            {items.map((item) => (
              <Col key={item._id}>
                <ItemCard item={item} />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <NotFound />
      )}
    </>
  );
}

export default SearchPage;
