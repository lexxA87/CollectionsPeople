import axios from "axios";
import configData from "../data/config.json";

export const userLogin = async (user) => {
  return await axios
    .post(`${configData.BASE_URL}api/auth/login`, user)
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      return res.data.user;
    })
    .catch((error) => error.response.data.message);
};

export const userRegistration = async (user) => {
  return await axios
    .post(`${configData.BASE_URL}api/auth/registration`, user)
    .then((res) => res.data)
    .catch((error) => error.response.data.message);
};

export const userAuth = async () => {
  return await axios
    .get(`${configData.BASE_URL}api/auth/auth`, {
      headers: { authorization: `${localStorage.getItem("token")}` },
    })
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      return res.data.user;
    })
    .catch((error) => {
      localStorage.removeItem("token");
      return error.response.data.message;
    });
};
