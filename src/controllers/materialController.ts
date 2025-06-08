import api from "../config/axios";

const MaterialController = {
  get: async (id: number) => {
    try {
      const response = await api.get(`/material/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default MaterialController;
