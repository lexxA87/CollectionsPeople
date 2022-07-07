import React, { useEffect, useState } from "react";
import { useDarkTheme } from "../../data/stores/useDarkTheme";
import { useTranslation } from "react-i18next";
import { Tabs, Tab, Card, Row, Col } from "react-bootstrap";
import ItemCard from "../item/ItemCard";
import { getItemsSort } from "../../api/itemsAPI";
import Loading from "../helper/Loading";
import { Link } from "react-router-dom";

function MainPageCollections() {
  const isDarkTheme = useDarkTheme((state) => state.isDarkTheme);
  const { t } = useTranslation();

  const [itemsSort, setItemsSort] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getItems = async () => {
    setLoading(true);
    const item = await getItemsSort();
    setItemsSort(item);
    setLoading(false);
  };

  useEffect(() => {
    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Tabs defaultActiveKey="items" id="tab_items" className="mb-3">
            <Tab
              eventKey="items"
              title={t("theLatestItem")}
              tabClassName={isDarkTheme ? "text-bg-dark" : ""}
              disabled
            >
              <Row xs={1} md={3} className="g-4">
                {itemsSort.map((item) => (
                  <Col key={item._id}>
                    <ItemCard item={item} />
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
                          to="/items"
                          style={{
                            color: "inherit",
                            textDecoration: "inherit",
                          }}
                        >
                          {t("viewMore")}
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
