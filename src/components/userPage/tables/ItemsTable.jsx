import React, { useMemo, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDarkTheme } from "../../../data/stores/useDarkTheme";
import { useCurrentUserStore } from "../../../data/stores/useCurrentUserStore";
import { getCollection } from "../../../api/collectionAPI";
import { Button, Card } from "react-bootstrap";
import ButtonsActionsTable from "./ButtonsActionsTable";
import Table from "./Table";
import Loading from "../../helper/Loading";
import CollectionPageHeader from "../../collection/CollectionPageHeader";
import ItemForm from "../../forms/ItemForm";

function ItemsTable() {
  const isDarkTheme = useDarkTheme((state) => state.isDarkTheme);
  const isAuth = useCurrentUserStore((state) => state.isAuth);
  const params = useParams();
  const [collection, setCollection] = useState({});
  const [item, setItem] = useState({
    title: "",
    author: "",
    collectionParent: "",
  });
  const [isLoading, setLoading] = useState(true);
  const [showItemForm, setShowItemForm] = useState(false);
  const collectionID = params.id;

  const setCurrentCollection = async (id) => {
    const coll = await getCollection(id);
    setCollection(coll);
    setLoading(false);
  };

  useEffect(() => {
    setCurrentCollection(collectionID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showItemForm]);

  const { title, theme, items, author, _id } = collection;
  console.log(collection);

  const structureTable = [
    {
      Header: "Items",
      columns: [
        {
          Header: "Name",
          id: "expander",
          accessor: "title",
          Cell: ({ row }) => {
            return (
              <Link
                to={`/collection/item${row.original._id}`}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                {row.original.title}
              </Link>
            );
          },
        },
        {
          Header: "Likes",
          accessor: "likes",
          Cell: ({ row }) => <>{row.original.likes}</>,
        },
        {
          Header: "Comments",
          accessor: "comments",
          Cell: ({ row }) => <>{row.original.comments.length}</>,
        },
        {
          Header: "Actions",
          accessor: "buttons",
          Cell: ({ row }) => (
            <ButtonsActionsTable
            // setShowForm={setShowCollectionForm}
            // object={row.original}
            // setObject={setCollection}
            // deleteObject={deleteCollection}
            // urlTo="collection"
            />
          ),
        },
      ],
    },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = useMemo(() => structureTable, []);
  const data = useMemo(() => items, [items]);

  const addNewItem = () => {
    setShowItemForm(true);
  };

  return isLoading ? (
    <Loading />
  ) : showItemForm ? (
    <ItemForm
      setShow={setShowItemForm}
      isDarkTheme={isDarkTheme}
      item={item}
      setItem={setItem}
      author={author._id}
      collectionID={_id}
    />
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
        <div className="row overflow-hidden">
          <div className="col-md-4">
            <Card.Img
              src="/images/Not-image.jpg"
              style={{ maxHeight: "300px" }}
              className="m-md-3"
            />
          </div>
          <div className="col-md-8">
            <Card.Body>
              <Card.Title>
                <h1 className="display-6 text-warning">{title}</h1>
              </Card.Title>
              <Card.Text>
                <dl className="row">
                  <dt className="col-sm-3">Theme</dt>
                  <dd className="col-sm-9">{theme.name}</dd>
                </dl>
              </Card.Text>
            </Card.Body>
          </div>
        </div>
      </Card>
      <div
        className="justify-content-end hstack gap-3 my-3 mx-2"
        bg={isDarkTheme && "dark"}
      >
        <Button variant="success" onClick={addNewItem}>
          Add New <i className="bi bi-plus-square"></i>
        </Button>
      </div>
      <Table columns={columns} data={data} isDarkTheme={isDarkTheme} />
    </>
  );
}

export default ItemsTable;
