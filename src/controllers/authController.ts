import api from "../config/axios";
import type { AxiosResponse } from "axios";

type loginProps = {
  username: string;
  password: string;
};
const AuthController = {
  login: async ({ username, password }: loginProps) => {
    try {
      const response = await api.post(
        "auth/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      return response;
    } catch (err) {
      console.error("Login error", err);
      throw err;
    }
  },
  checkAuth: async () => {
    try {
      const response: AxiosResponse = await api.get("checkauth/", {
        withCredentials: true,
      });
      if (response.status == 200) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error("Auth check failed", err);
      throw err;
    }
  },
  refreshToken: async () => {
    try {
      const response: AxiosResponse = await api.post(
        "refresh/",
        {},
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      console.error("Auth check failed", error);
      throw error;
    }
  },
  logout: async () => {
    try {
      const response: AxiosResponse = await api.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      return response;
    } catch (error) {
      console.error("Logout Error", error);
      throw error;
    }
  },
};

export default AuthController;
