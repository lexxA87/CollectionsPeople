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
  console.log(collID);
  return await axios
    .delete(
      `${configData.BASE_URL}api/itemCollection?id=${id}&collID=${collID}`
    )
    .then((res) => res.data)
    .catch((error) => error.response.data.message);
};
