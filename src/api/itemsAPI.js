import axios from "axios";
import configData from "../data/config.json";

export const postItem = async (item, collectionParent, author) => {
  const i = { ...item, author, collectionParent };
  console.log(i);
  return await axios
    .post(`${configData.BASE_URL}api/itemCollection`, i)
    .then((res) => res.data)
    .catch((error) => error.response.data.message);
};
