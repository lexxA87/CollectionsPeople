import axios from "axios";
import configData from "../data/config.json";

export const getTags = async () => {
  return await axios
    .get(`${configData.BASE_URL}api/tags`)
    .then((res) => res.data)
    .catch((error) => error.response.data.message);
};

export const getTagsCloud = async () => {
  return await axios
    .get(`${configData.BASE_URL}api/tagsCloud?limit=${configData.LIMIT_TAGS}`)
    .then((res) => res.data)
    .catch((error) => error.response.data.message);
};
