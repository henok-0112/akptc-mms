import type { AxiosResponse } from "axios";
import api from "../config/axios";

type searchProps = { page?: number; limit?: number; search?: string | number };

const UserController = {
  currentUser: async () => {
    try {
      const response: AxiosResponse = await api.get("/user/me", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {}
  },
  getGuards: async (page?: number, limit?: number) => {
    try {
      const response: AxiosResponse = await api.get("/user/guard", {
        params: { page: page, limit: limit },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  searchGuards: async ({ page, limit, search }: searchProps) => {
    try {
      const response = await api.get("/user/guard", {
        params: { page: page, limit: limit, search: search },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  updateGuard: async (id: number, data: FormData) => {
    try {
      const response = await api.put(`/user/guard/update/${id}`, data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  deleteGuard: async (id: number) => {
    try {
      const response = await api.delete(`/user/guard/delete/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default UserController;
