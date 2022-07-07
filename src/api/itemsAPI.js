import axios from "axios";
import configData from "../data/config.json";

export const postItem = async (item, collectionParent, author) => {
  const i = { ...item, author, collectionParent };
  return await axios
    .post(`${configData.BASE_URL}api/itemCollection`, i)
    .then((res) => res.data)
    .catch((error) => error.response.data.message);
};

export const putItem = async (item, id) => {
  return await axios
    .put(`${configData.BASE_URL}api/itemCollection?id=${id}`, item)
    .then((res) => res.data)
    .catch((error) => error.response.data.message);
};

export const deleteItem = async (id, collID) => {
  return await axios
    .delete(
      `${configData.BASE_URL}api/itemCollection?id=${id}&collID=${collID}`
    )
    .then((res) => res.data)
    .catch((error) => error.response.data.message);
};

export const getItemsSort = async () => {
  return await axios
    .get(
      `${configData.BASE_URL}api/itemCollectionsSort?limit=${configData.LIMIT_ITEMS}`
    )
    .then((res) => res.data)
    .catch((error) => error.response.data.message);
};

export const getItems = async () => {
  return await axios
    .get(`${configData.BASE_URL}api/itemCollections`)
    .then((res) => res.data)
    .catch((error) => error.response.data.message);
};