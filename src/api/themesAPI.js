import axios from "axios";
import configData from "../data/config.json";

export const getThemes = async () => {
  return await axios
    .get(`${configData.BASE_URL}api/themes`)
    .then((res) => res.data)
    .catch((error) => error.response.data.message);
};
