import axios from "axios";
import { clearUser } from "../helpers/logout";

const api = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,

  timeout: 600000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      clearUser();
      return Promise.resolve(null);
    }
    return Promise.reject(error);
  }
);

export default api;
