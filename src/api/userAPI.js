import axios from "axios";

export const userLogin = async (user) => {
  return await axios
    .post(`http://localhost:8080/api/auth/login`, user)
    .then((res) => res.data)
    .catch((error) => error.response.data.message);
};

export const userRegistration = async (user) => {
  return await axios
    .post(`http://localhost:8080/api/auth/registration`, user)
    .then((res) => res.data)
    .catch((error) => error.response.data.message);
};
