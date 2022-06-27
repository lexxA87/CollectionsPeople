import axios from "axios";
import configData from "../data/config.json";

export const getCollections = async (userId) => {
  return await axios
    .get(`${configData.BASE_URL}api/collections`, {
      params: { author: userId },
    })
    .then((res) => res.data)
    .catch((error) => error.response.data.message);
};

export const putCollection = async (collection, id) => {
  return await axios
    .put(`${configData.BASE_URL}api/collection`, {
      params: { id: id },
      body: { collection },
    })
    .then((res) => res.data)
    .catch((error) => error.response.data.message);
};
