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

export const getCollectionsSort = async () => {
  return await axios
    .get(
      `${configData.BASE_URL}api/collectionsSort?limit=${configData.limitCollection}`
    )
    .then((res) => res.data)
    .catch((error) => error.response.data.message);
};

export const getCollection = async (id) => {
  return await axios
    .get(`${configData.BASE_URL}api/collection?id=${id}`)
    .then((res) => res.data)
    .catch((error) => error.response.data.message);
};

export const putCollection = async (collection, id) => {
  return await axios
    .put(`${configData.BASE_URL}api/collection?id=${id}`, collection)
    .then((res) => res.data)
    .catch((error) => error.response.data.message);
};

export const postCollection = async (collection, author) => {
  const coll = { ...collection, author };
  return await axios
    .post(`${configData.BASE_URL}api/collection`, coll)
    .then((res) => res.data)
    .catch((error) => error.response.data.message);
};

export const deleteCollection = async (id) => {
  return await axios
    .delete(`${configData.BASE_URL}api/collection?id=${id}`)
    .then((res) => res.data)
    .catch((error) => error.response.data.message);
};
