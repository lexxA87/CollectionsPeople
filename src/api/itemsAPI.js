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

// Dont forget collection ID for delete item!!!
