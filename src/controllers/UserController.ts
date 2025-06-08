import type { AxiosResponse } from "axios";
import api from "../config/axios";

const UserController = {
  currentUser: async () => {
    try {
      const response: AxiosResponse = await api.get("user/me", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {}
  },
};

export default UserController;
