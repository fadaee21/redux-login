import axios from "axios";
import { User } from "../../type";


//api: php webprog
const API_URL_LOGIN = "http://localhost:8000/api/login";
const API_URL_LOGOUT = "http://localhost:8000/api/logout";

const login = async (userData: User) => {
  const response = await axios.post(API_URL_LOGIN, userData, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async (token: string) => {
  const headersList = {
    Authorization: `Bearer ${token}`,
  };

  const reqOptions = {
    url: API_URL_LOGOUT,
    method: "POST",
    headers: headersList,
  };
  const response = await axios.request(reqOptions);
  return response.data;
};

const authService = { login, logout };

export default authService;
